import { useEffect, useRef } from 'react';
import Quagga from '@ericblade/quagga2';
import { useScannerStore } from '../../stores/useScannerStore';
import { useBooks } from '../../hooks/useBooks';
import { useNavigate } from 'react-router';

export function IsbnScanner() {

    const { isScannerOpen, closeScanner } = useScannerStore();

    const navigate = useNavigate()
    const { getWorkByISBN } = useBooks();

    const handleIsbnRead = async (isbn: string) => {
        closeScanner()

        try {
            const data = await getWorkByISBN(isbn);

            if (data && data.works && data.works.length > 0) {
                const workId = data.works[0].key.replace('/works/', '');
                navigate(`/book/${workId}/${isbn}`);
            } else {
                alert("Book not found for this ISBN.");
            }
        } catch (error) {
            alert("Error retrieving ISBN. Check your connection.");
        }
    };

    const scannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scannerRef.current) return;

        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    width: { min: 640, ideal: 1280 },
                    height: { min: 480, ideal: 720 },
                    facingMode: 'environment',
                    aspectRatio: { min: 1, max: 2 }
                },
                target: scannerRef.current,
            },
            locator: {
                patchSize: "medium",
                halfSample: true,
            },
            decoder: {
                readers: ['ean_reader'],
                multiple: false
            },
            locate: true,
            numOfWorkers: navigator.hardwareConcurrency || 4,
            frequency: 1,
        }, (err) => {
            if (err) return console.error(err);
            Quagga.start();
        });

        Quagga.onDetected((data) => {
            if (data.codeResult && data.codeResult.code) {
                const code = data.codeResult.code;
                Quagga.stop();
                handleIsbnRead(code);
            }
        });

        return () => {
            Quagga.stop();
        };
    }, [isScannerOpen]);

    if (!isScannerOpen) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" >
            <div className="bg-white p-2 rounded-2xl w-full max-w-md relative overflow-hidden"
                role="dialog"
                aria-modal="true"
                aria-labelledby="scanner-title"
                aria-describedby="scanner-description"
            >

                <h2 id="scanner-title" className="sr-only">
                    ISBN barcode scanner
                </h2>

                <p id="scanner-description" className="sr-only">
                    Use your camera to scan a book barcode. Position the barcode in front of the camera.
                </p>

                <button
                    onClick={closeScanner}
                    aria-label='Close Scanner'
                    className="absolute top-4 right-4 z-10 bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-md hover:cursor-pointer hover:bg-red-400 hover:text-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white transition-all duration-100"
                >
                    Close
                </button>

                <div
                    ref={scannerRef}
                    aria-hidden="true"
                    className="w-full h-75 rounded-xl overflow-hidden [&>video]:w-full [&>video]:h-full [&>video]:object-cover [&>canvas]:hidden"
                />

                <div className="p-4 text-center">
                    <div className="inline-block w-full h-1 bg-blue-500 animate-pulse mb-2"></div>
                    <p className="text-gray-600 font-medium" aria-live='polite'>Position the barcode on the blue line.</p>
                </div>
            </div>
        </div>
    );
}