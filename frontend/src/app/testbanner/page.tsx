"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";

export default function BannerPage() {
  const [imagemBase64, setImagemBase64] = useState<string | null>(null);

  useEffect(() => {
    const fetchImagem = async () => {
      try {
        const res = await axios.get("http://localhost:5000/imagem-banner");
        setImagemBase64(res.data.imagemBase64);
      } catch (err) {
        console.error("Erro ao buscar imagem:", err);
      }
    };

    fetchImagem();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      
      {/* Banner com sobreposição */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        {imagemBase64 ? (
          <img 
            src={`data:image/jpeg;base64,${imagemBase64}`}
            alt="Ocean Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Carregando imagem...</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Bem-vindo ao Oceano</h1>
          <p className="text-white text-lg mt-2">Explore a beleza e a serenidade do mar</p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col items-center gap-6 p-8">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="p-6 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">Começar a Explorar</h2>
            <Button onClick={() => alert("ShadCN/UI funcionando!")} className="w-full mb-3">
              Testar Botão
            </Button>
            <Button variant="outline" className="w-full">
              Área de Login
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
