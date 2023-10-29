export interface Agency {
  id: string;
  name: string;
  nameFantasy: string;
  address: string;
  phone: string;
  email: string;
  document: string;
  ownerId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  address?: string;
  phone?: string;
  cpf: string;
  agencyId?: string;
  agencyRole?: string;
}

export interface Category { 
  id: string;
  name: string;
  // agencyId: string;
}

export interface Creative {
  id: string;
  name: string;
  categoryId: string;
  category: string;
  format: string;
}