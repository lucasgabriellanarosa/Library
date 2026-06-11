import { useState, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../stores/useAuthStore";

export const useUserLists = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [selectedList, setSelectedList] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuthStore();

  // 1. Busca os STATUS oficiais da tabela 'reading_status' para fingir que são as listas primárias
  const fetchAllLists = useCallback(async () => {
    setLoading(true);
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reading_status')
        .select('*');

      if (error) throw error;

      if (data && data.length > 0) {
        // Mapeia status_id para 'id' para a LibraryPage continuar funcionando sem alterações
        const formattedLists = data.map(item => ({
          id: item.status_id, // 'read', 'reading', 'to_read'
          name: item.name     // 'Read', 'Reading', 'To Read'
        }));

        // Ordena amigavelmente: Reading primeiro, depois To Read, depois Read
        const customOrder = ['reading', 'to_read', 'read'];
        formattedLists.sort((a, b) => customOrder.indexOf(a.id) - customOrder.indexOf(b.id));

        setLists(formattedLists);
        setSelectedList((prev: any) => prev || formattedLists[0]);
      }
    } catch (error) {
      console.log("Error fetching reading statuses:", error);
    } finally {
      setLoading(false);
    }
  }, [user])

  // 2. Busca os livros de um status específico na tabela user_books
  
  const fetchBooksFromList = useCallback(async (statusId: string) => {
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from('user_books')
        .select('*')
        .eq('user_id', user.id)
        .eq('status_id', statusId)
        .order('added_at', { ascending: false });

      if (error) throw error;

      if (data) {
        // Traduz as propriedades do banco para o padrão que o JSX da LibraryPage consome
        const formattedBooks = data.map(b => ({
          id: b.book_id,
          work_key: `/works/${b.book_id}`,
          title: b.title || "Untitled Book",
          author_name: b.author_name || "Unknown Author",
          cover_id: b.cover_id || ""
        }));
        setBooks(formattedBooks);
      }
    } catch (error) {
      console.log("Error fetching books from status:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // 3. Remove um livro do status atual (deleta a linha em user_books)
  const removeBookFromList = async (bookId: string) => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
        .from('user_books')
        .delete()
        .eq('user_id', user.id)
        .eq('book_id', bookId);

      if (error) throw error;

      // Remove do estado local para sumir da tela na hora
      setBooks(prev => prev.filter(b => b.id !== bookId));
    } catch (error) {
      console.log("Error removing book status:", error);
    } finally {
      setLoading(false);
    }
  };

  // 4. Pega o status atual de um livro específico (usado na página interna do livro)
  const getBookStatus = async (bookId: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_books')
        .select('status_id')
        .eq('user_id', user.id)
        .eq('book_id', bookId)
        .maybeSingle();

      if (error) throw error;
      
      if (data?.status_id === 'read') return 'Read';
      if (data?.status_id === 'to_read') return 'To Read';
      if (data?.status_id === 'reading') return 'Reading';
      
      return null;
    } catch (error) {
      console.log("Error getting book status: ", error);
      return null;
    }
  };

  // 5. Altera/Adiciona o status salvando também os metadados do livro
  const toogleBookStatus = async (params: {
    targetListName: 'Read' | 'To Read',
    bookId: string,
    bookData?: any, // Adicionado de volta para colher título, autor e capa
    currentStatus: string | null
  }) => {
    if (!user) return null;
    setLoading(true);

    const dbStatusId = params.targetListName === 'Read' ? 'read' : 'to_read';

    try {
      if (params.currentStatus === params.targetListName) {
        await supabase
          .from('user_books')
          .delete()
          .eq('user_id', user.id)
          .eq('book_id', params.bookId);
          
        return null;
      }

      const { error } = await supabase
        .from('user_books')
        .upsert({
          user_id: user.id,
          book_id: params.bookId,
          status_id: dbStatusId, 
          title: params.bookData?.title,
          author_name: params.bookData?.author,
          cover_id: String(params.bookData?.cover),
          finished_reading_at: dbStatusId === 'read' ? new Date().toISOString() : null
        });

      if (error) throw error;

      return params.targetListName;
    } catch (error) {
      console.log("Error toggling book status: ", error);
      return params.currentStatus as 'Read' | 'To Read' | null;
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
    getBookStatus,
    toogleBookStatus
  };
};