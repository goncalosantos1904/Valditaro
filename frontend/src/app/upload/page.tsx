"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UploadImagem() {
  const [imagem, setImagem] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imagem) return;

    const formData = new FormData();
    formData.append("imagem", imagem);

    try {
      const res = await axios.post("http://localhost:5000/upload-imagem", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Imagem enviada com sucesso! Caminho: " + res.data.path);
    } catch (err) {
      alert("Erro ao enviar imagem");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-md mx-auto">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImagem(e.target.files?.[0] ?? null)}
      />
      <Button type="submit">Enviar Imagem</Button>
    </form>
  );
}
