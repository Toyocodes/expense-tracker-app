import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransaction";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useEditTransaction } from "../../hooks/useEditTransaction";
import { useDeleteTransaction } from "../../hooks/useDeleteTransaction";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Loader from "../../components/loader";
import Greeting from "../../components/greetings";
import { ColorRing } from "react-loader-spinner";

const ExpenseTracker = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [editMode, setEditMode] = useState(false);
  const [currentTransactionId, setCurrentTransactionId] = useState(null);

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals, loading } = useGetTransactions();
  const { editTransaction } = useEditTransaction();
  const { deleteTransaction } = useDeleteTransaction();
  const { balance, income, expenses } = transactionTotals;
  const { name, profilePhoto } = useGetUserInfo();

  const onSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      editTransaction(currentTransactionId, {
        description,
        transactionAmount,
        transactionType,
      });
      toast.success("Transaction updated successfully");
      setEditMode(false);
      setCurrentTransactionId(null);
    } else {
      addTransaction({
        description,
        transactionAmount,
        transactionType,
      });
      toast.success(
        transactionType === "expense"
          ? "Expense added successfully"
          : "Income added successfully"
      );
    }

    setDescription("");
    setTransactionAmount(0);
    setTransactionType("expense");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
      toast.success("You are logged out!");
    } catch (err) {
      console.error(err);
    }
  };

  const onEdit = (transaction) => {
    setDescription(transaction.description);
    setTransactionAmount(transaction.transactionAmount);
    setTransactionType(transaction.transactionType);
    setEditMode(true);
    setCurrentTransactionId(transaction.id);
  };

  const onDelete = (transactionId) => {
    deleteTransaction(transactionId);
    toast.success("Transaction deleted successfully");
  };
 

  return (
    <div className="pt-8">
     
        <div className="mx-auto max-w-6xl p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            {profilePhoto && (
              <div>
                <img
                  className="w-16 h-16 rounded-full mr-2"
                  src={profilePhoto}
                  alt="Profile Photo"
                />
              </div>
            )}
            <div>
              <button
                className=" bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                onClick={signUserOut}
              >
                Sign Out
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 mr-4">
              <div className="mb-6">
                {/* <h1 className="text-2xl font-semibold leading-8">Hi {name}! 👋</h1> */}
                <Greeting name={name} />
                <p className="text-gray-500">
                  Let&apos;s track today&apos;s expenses 😊
                </p>
              </div>
              <div className=" bg-purple-900 text-white rounded-xl shadow-lg p-6 mb-4 text-center">
                <h3 className="text-lg mb-2">Total Balance</h3>
                <h2 className="text-4xl font-bold">
                  {balance >= 0 ? `₦${balance}` : `-₦${balance * -1}`}
                </h2>
              </div>
              {loading ? (
                <Loader />
              ) : (
                <div className="flex justify-between mb-4 text-center">
                  <div className="p-4 bg-yellow-100 rounded-xl shadow-md flex-1 mx-1">
                    <h4 className="text-base ">Income</h4>
                    <p className="text-2xl font-bold">₦{income}</p>
                  </div>
                  <div className="p-4 bg-pink-100 rounded-xl shadow-md flex-1 mx-1">
                    <h4 className="text-base ">Expenses</h4>
                    <p className="text-2xl font-bold">₦{expenses}</p>
                  </div>
                </div>
              )}
              <form className="mb-4" onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 mb-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={transactionAmount}
                  required
                  onChange={(e) => setTransactionAmount(Number(e.target.value))}
                  className="w-full p-2 mb-2 border rounded-md"
                />
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="expense" className="mr-4">
                    Expense
                  </label>
                  <input
                    type="radio"
                    id="income"
                    value="income"
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="income">Income</label>
                </div>
                <button
                  type="submit"
                  className={`w-full ${
                    editMode ? "bg-yellow-500" : "bg-green-500"
                  } text-white py-2 rounded-md hover:bg-opacity-80 transition`}
                >
                  {editMode ? "Update Transaction" : "Add Transaction"}
                </button>
              </form>
            </div>
            <div className="flex-1 mt-4 lg:mt-11 lg:ml-4">
              <h3 className="text-lg font-semibold mb-2">Transactions</h3>
              <div className="transactions overflow-y-auto max-h-[410px]">
                {loading ? (
                  <Loader />
                ) : (
                  <div className="space-y-4">
                    {transactions.map((transaction, index) => {
                      const {
                        description,
                        transactionAmount,
                        transactionType,
                        id,
                      } = transaction;
                      return (
                        <div
                          key={index}
                          className={`bg-gray-50 border-l-4 ${
                            transactionType === "expense"
                              ? "border-red-500"
                              : "border-green-500"
                          } p-4 rounded-md shadow-md flex justify-between items-center`}
                        >
                          <div>
                            <h4 className="font-semibold">{description}</h4>
                            <p>
                              ₦{transactionAmount} •{" "}
                              <span
                                className={
                                  transactionType === "expense"
                                    ? "text-red-500"
                                    : "text-green-500"
                                }
                              >
                                {transactionType}
                              </span>
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              className="transition"
                              onClick={() => onEdit(transaction)}
                            >
                              <AiFillEdit color={"#4CAF50"} size={25} />
                            </button>
                            <button
                              className="transition"
                              onClick={() => onDelete(id)}
                            >
                              <MdDelete color={"#FF0000"} size={25} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default ExpenseTracker;
