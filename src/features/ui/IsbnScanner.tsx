import { useEffect, useRef } from 'react';
import Quagga from '@ericblade/quagga2';

interface IsbnScannerProps {
    onScanSuccess: (isbn: string) => void;
    onClose: () => void;
}

export function IsbnScanner({ onScanSuccess, onClose }: IsbnScannerProps) {
    const scannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scannerRef.current) return;

        Quagga.init({
            inputStream: {
                type: 'LiveStream',
                constraints: {
                    width: { min: 640, ideal: 1280 }, // Aumenta a resolução para ver barras finas
                    height: { min: 480, ideal: 720 },
                    facingMode: 'environment',
                    aspectRatio: { min: 1, max: 2 }
                },
                target: scannerRef.current,
            },
            locator: {
                patchSize: "medium", // Tamanho da área de busca (medium é o equilíbrio ideal)
                halfSample: true,    // Processa a imagem mais rápido
            },
            decoder: {
                readers: ['ean_reader'], // Foco exclusivo em ISBN
                multiple: false          // Para no primeiro que achar
            },
            locate: true,
            // AQUI O SEGREDO: Filtros de imagem para realçar as barras
            numOfWorkers: navigator.hardwareConcurrency || 4, // Usa mais núcleos do processador
            frequency: 10, // Tenta ler 10 vezes por segundo
        }, (err) => {
            if (err) return console.error(err);
            Quagga.start();
        });
        // Detectou o código!
        Quagga.onDetected((data) => {
            if (data.codeResult && data.codeResult.code) {
                const code = data.codeResult.code;
                // O Quagga é rápido, então paramos ele na hora para não ler 10x
                Quagga.stop();
                onScanSuccess(code);
            }
        });

        return () => {
            Quagga.stop();
        };
    }, [onScanSuccess]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="bg-white p-2 rounded-2xl w-full max-w-md relative overflow-hidden">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-md"
                >
                    Sair
                </button>

                {/* O vídeo da câmera aparece aqui dentro */}
                <div
                    ref={scannerRef}
                    className="w-full h-75 rounded-xl overflow-hidden [&>video]:w-full [&>video]:h-full [&>video]:object-cover [&>canvas]:hidden"
                />

                <div className="p-4 text-center">
                    <div className="inline-block w-full h-1 bg-blue-500 animate-pulse mb-2"></div>
                    <p className="text-gray-600 font-medium">Posicione o código de barras na linha azul</p>
                </div>
            </div>
        </div>
    );
}