// src/utils/decodeJWT.ts

function base64UrlDecode(str: string) {
    // Replace characters as per Base64 encoding rules
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    // Decode base64 string to a JSON string
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  }
  
  export function decodeJWT(token: string) {
    const [header, payload, signature] = token.split('.');
  
    if (!payload) {
      throw new Error('Invalid JWT token');
    }
  
    // Decode the payload part of the JWT
    const decodedPayload = base64UrlDecode(payload);
  
    // Parse the decoded JSON string into an object
    return JSON.parse(decodedPayload);
  }
  