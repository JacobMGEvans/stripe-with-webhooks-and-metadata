export {};

declare global {
  interface CustomJwtSessionClaims {
    "public-metadata": {
      stripe: {
        status: string | null;
        payment: string;
      };
    };
  }
}
