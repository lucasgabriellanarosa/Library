import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/useAuthStore";

export const useUserLists = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthStore();

  // 1. Search all lists and set the first one as the default.
  const fetchAllLists = useCallback(async () => {
    setLoading(true);

    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await supabase
        .from('lists')
        .select('*')
        .eq('user_id', user.id)
        .order('type', { ascending: false });

      if (data && data.length > 0) {
        setLists(data);
        setSelectedList((prev: any) => prev || data[0]);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }

  }, []);

  // 2. Search for books from a specific list.
  const fetchBooksFromList = useCallback(async (listId: string) => {
    setLoading(true)

    try {
      const { data } = await supabase
        .from('list_books')
        .select('*')
        .eq('list_id', listId)
        .order('added_at', { ascending: false });

      if (data) setBooks(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }, []);

  // 3. Auxiliary function to delete book
  const removeBookFromList = async (bookId: string) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('list_books').delete().eq('id', bookId);
      if (!error) setBooks(prev => prev.filter(b => b.id !== bookId));
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  // 4. Search specific lists (useful for BookPage)
  const getSpecificLists = useCallback(async (names: string[]) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('lists')
      .select('id, name')
      .eq('user_id', user.id)
      .in('name', names);

    return data;
  }, []);

  // 5. Toggle Between Read and To Read & Delete status
  const toogleBookStatus = async (params: {
    targetListName: 'Read' | 'To Read',
    workId: string,
    bookData: any,
    currentStatus: string | null
  }) => {
    setLoading(true); 
    try {
      const userLists = await getSpecificLists(['Read', 'To Read']);
      const targetList = userLists?.find(l => l.name === params.targetListName);
      const otherList = userLists?.find(l => l.name !== params.targetListName);

      if (!targetList) return;
      
      // If a book is set as "read" and you click the "read" button again, it will be without a status (it is not read, but also it is not in to read later)
      if (params.currentStatus === params.targetListName) {
        await supabase
          .from('list_books')
          .delete()
          .match({ list_id: targetList.id, work_key: `/works/${params.workId}` });
        return null;
      }

      // Delete the book from the other list
      if (otherList) {
        await supabase.from('list_books').delete()
          .match({ list_id: otherList.id, work_key: `/works/${params.workId}` });
      }

      await supabase.from('list_books').upsert({
        list_id: targetList.id,
        work_key: `/works/${params.workId}`,
        title: params.bookData?.title,
        author_name: params.bookData?.author,
        cover_id: String(params.bookData?.cover),
      });

      return params.targetListName; 
    } finally {
      setLoading(false); 
    }
  };

  return {
    lists,
    books,
    selectedList,
    setSelectedList,
    loading,
    fetchAllLists,
    fetchBooksFromList,
    removeBookFromList,
    getSpecificLists,
    toogleBookStatus
  };
};