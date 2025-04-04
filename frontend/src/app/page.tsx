"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Cliente {
  id: number;
  nome: string;
  email: string;
  ncont: number;
}

// Pega a URL da API do arquivo .env.local
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/clientes`)
      .then((response) => setClientes(response.data))
      .catch((error) => console.error("Erro ao buscar clientes", error));
  }, []);

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-4">Lista de Clientes</h1>
      <Button onClick={() => alert("ShadCN/UI funcionando!")} className="mb-4">
        Testar Botão
      </Button>
      <div className="grid gap-4">
        {clientes.map((cliente) => (
          <Card key={cliente.id} className="w-96">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold">{cliente.nome}</h2>
              <p className="text-gray-500">{cliente.ncont}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
