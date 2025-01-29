import { FileItem } from "./src/lib/types";

export const fileData: FileItem[] = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          {
            id: "3",
            name: "file-explorer.tsx",
            type: "file",
          },
          {
            id: "4",
            name: "code-editor.tsx",
            type: "file",
          },
          {
            id: "5",
            name: "editor-tabs.tsx",
            type: "file",
          },
          {
            id: "6",
            name: "header.tsx",
            type: "file",
          },
        ],
      },
      {
        id: "7",
        name: "lib",
        type: "folder",
        children: [
          {
            id: "8",
            name: "utils.ts",
            type: "file",
          },
          {
            id: "9",
            name: "constants.ts",
            type: "file",
          },
        ],
      },
      {
        id: "10",
        name: "assets",
        type: "folder",
        children: [
          {
            id: "11",
            name: "images",
            type: "folder",
            children: [
              {
                id: "12",
                name: "logo.svg",
                type: "file",
              },
              {
                id: "13",
                name: "background.png",
                type: "file",
              },
            ],
          },
          {
            id: "14",
            name: "styles",
            type: "folder",
            children: [
              {
                id: "15",
                name: "main.css",
                type: "file",
              },
              {
                id: "16",
                name: "variables.css",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: "17",
        name: "App.tsx",
        type: "file",
      },
      {
        id: "18",
        name: "main.tsx",
        type: "file",
      },
      {
        id: "19",
        name: "vite-env.d.ts",
        type: "file",
      },
    ],
  },
  {
    id: "20",
    name: "public",
    type: "folder",
    children: [
      {
        id: "21",
        name: "index.html",
        type: "file",
      },
      {
        id: "22",
        name: "favicon.ico",
        type: "file",
      },
    ],
  },
  {
    id: "23",
    name: "package.json",
    type: "file",
  },
  {
    id: "24",
    name: "tsconfig.json",
    type: "file",
  },
  {
    id: "25",
    name: "README.md",
    type: "file",
  },
];
