"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import React from "react";

export default function BannerPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full h-64 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="Ocean Banner"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Ocean</h1>
        <p className="text-lg text-gray-700">
          Explore the beauty and serenity of the sea.
        </p>
      </div>
    </div>
  );
}