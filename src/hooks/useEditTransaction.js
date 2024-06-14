import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useEditTransaction = () => {
  const editTransaction = async (transactionId, updatedTransaction) => {
    const transactionDocRef = doc(db, "transactions", transactionId);
    await updateDoc(transactionDocRef, updatedTransaction);
  };

  return { editTransaction };
};
