"use client";

import React, { useState } from "react";
import type { TabsBlock as TabsBlockProps } from "src/payload-types";
import { cn } from "@/utilities/ui";

type Props = {
    className?: string;
} & TabsBlockProps;

export const TabsBlock: React.FC<Props> = ({ className, tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className={cn("tabs-container mx-auto my-4 w-full", className)}>
            {/* Cabecera de pestañas */}
            <div className="tabs-header flex border-l border-r border-t border-gray-300 bg-gray-100 rounded-t rounded-b-none">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={cn(
                            "tab-item px-4 py-2 text-left font-bold", // Se elimina w-full
                            activeTab === index
                                ? "bg-gray-100 border-b-4 border-black"
                                : "border-b-4 border-gray-300"
                        )}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Contenido de la pestaña activa */}
            <div className="tabs-content px-4 py-2 border border-gray-300 rounded-b-md rounded-t-none bg-white">
                {tabs[activeTab] && tabs[activeTab].content && (
                    <div>
                        {renderRichText(tabs[activeTab].content)}
                    </div>
                )}
            </div>
        </div>
    );
};

/* Función para renderizar RichText */
const renderRichText = (content: TabsBlockProps["tabs"][0]["content"]) => {
    return content.root.children.map((node, index) => {
        if (!node || !Array.isArray(node.children)) {
            return null; // Ignora nodos sin estructura válida
        }

        switch (node.type) {
            case "paragraph":
                return (
                    <p key={index}>
                        {node.children.map((child, childIndex) => child.text || "").join("")}
                    </p>
                );
            case "heading":
                return (
                    <h2 key={index}>
                        {node.children.map((child, childIndex) => child.text || "").join("")}
                    </h2>
                );
            default:
                return null;
        }
    });
};
