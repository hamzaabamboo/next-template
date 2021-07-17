import React from "react";

interface CommonPageContext {
  head?: {
    title?: string;
    description?: string;
    image?: string | string[];
    url?: string;
    banner?: string;
  };
  backgroundImage?: string;
  isStatic?: boolean;
}

export type PageContext<T = {}> = CommonPageContext & T;
