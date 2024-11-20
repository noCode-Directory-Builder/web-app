"use client";

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface LivePreviewProps {
  blocks: any[];
  styles: string;
}

export function LivePreview({ blocks, styles }: LivePreviewProps) {
  const [iframeContent, setIframeContent] = useState('');

  useEffect(() => {
    const generatePreview = () => {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              ${styles}
            </style>
          </head>
          <body>
            ${blocks.map(block => renderBlock(block)).join('')}
          </body>
        </html>
      `;
      setIframeContent(html);
    };

    generatePreview();
  }, [blocks, styles]);

  const renderBlock = (block: any) => {
    switch (block.type) {
      case 'hero':
        return `
          <section class="hero relative py-20 px-4 text-center text-white" ${
            block.data.image ? `style="background-image: url('${block.data.image}')"` : ''
          }>
            <div class="relative z-10">
              <h1 class="text-4xl md:text-6xl font-bold mb-4">${block.data.title || ''}</h1>
              <p class="text-xl md:text-2xl max-w-3xl mx-auto">${block.data.description || ''}</p>
            </div>
          </section>
        `;

      case 'text':
        return `
          <section class="py-12 px-4">
            <div class="max-w-3xl mx-auto prose">
              ${block.data.content || ''}
            </div>
          </section>
        `;

      case 'featured-listings':
        return `
          <section class="py-12 px-4 bg-gray-50">
            <div class="max-w-6xl mx-auto">
              <h2 class="text-3xl font-bold text-center mb-8">${block.data.title || 'Featured Listings'}</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                ${Array(block.data.count || 3).fill(0).map(() => `
                  <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-48 bg-gray-200"></div>
                    <div class="p-4">
                      <h3 class="font-bold">Sample Listing</h3>
                      <p class="text-gray-600">Sample description text</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;

      case 'cta':
        return `
          <section class="py-12 px-4 bg-primary text-white text-center">
            <div class="max-w-3xl mx-auto">
              <h2 class="text-3xl font-bold mb-4">${block.data.title || ''}</h2>
              <p class="text-xl mb-6">${block.data.description || ''}</p>
              <button class="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-colors">
                ${block.data.buttonText || 'Learn More'}
              </button>
            </div>
          </section>
        `;

      case 'gallery':
        return `
          <section class="py-12 px-4">
            <div class="max-w-6xl mx-auto">
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                ${(block.data.images || []).map((image: string) => `
                  <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                    <img src="${image}" alt="" class="w-full h-full object-cover">
                  </div>
                `).join('')}
              </div>
            </div>
          </section>
        `;

      default:
        return `<div>Block type not supported: ${block.type}</div>`;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <iframe
        srcDoc={iframeContent}
        className="flex-1 w-full"
        title="Page Preview"
        sandbox="allow-scripts"
      />
    </Card>
  );
}