interface Resident {
  id?: number | null;
  name: string;
  email: string;
  firstDay: string; // Você pode usar o tipo Date, mas para compatibilidade com JSON, podemos usar string
 // monthlyPayments?: MonthlyPayment[]; 
}