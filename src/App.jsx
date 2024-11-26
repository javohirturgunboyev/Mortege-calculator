import React, { useState } from "react";

const MortgageCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState(300000);
  const [term, setTerm] = useState(25);
  const [interestRate, setInterestRate] = useState(5.25);
  const [mortgageType, setMortgageType] = useState("repayment");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  const calculateRepayments = () => {
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = term * 12;
    const repayment =
      mortgageType === "repayment"
        ? (mortgageAmount * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -numPayments))
        : mortgageAmount * monthlyRate;

    setMonthlyPayment(repayment.toFixed(2));
    setTotalRepayment(
      (repayment * (mortgageType === "repayment" ? numPayments : term * 12)).toFixed(2)
    );
  };

  const clearAll = () => {
    setMortgageAmount(300000);
    setTerm(25);
    setInterestRate(5.25);
    setMortgageType("repayment");
    setMonthlyPayment(null);
    setTotalRepayment(null);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-4/5 max-w-4xl">
        <div className="p-8 bg-gray-50 w-1/2">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Mortgage Calculator</h1>
            <button onClick={clearAll} className="text-blue-600 underline">
              Clear All
            </button>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Mortgage Amount
            </label>
            <div className="flex items-center mt-2">
              <span className="mr-2 text-gray-500">£</span>
              <input
                type="number"
                value={mortgageAmount}
                onChange={(e) => setMortgageAmount(+e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1"
              />
            </div>
          </div>
          <div className="flex mt-4 space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600">
                Mortgage Term
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  value={term}
                  onChange={(e) => setTerm(+e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1"
                />
                <span className="ml-2 text-gray-500">years</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600">
                Interest Rate
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(+e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1"
                />
                <span className="ml-2 text-gray-500">%</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600">
              Mortgage Type
            </label>
            <div className="flex items-center mt-2 space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="repayment"
                  checked={mortgageType === "repayment"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  className="mr-2"
                />
                Repayment
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="interest-only"
                  checked={mortgageType === "interest-only"}
                  onChange={(e) => setMortgageType(e.target.value)}
                  className="mr-2"
                />
                Interest Only
              </label>
            </div>
          </div>
          <button
            onClick={calculateRepayments}
            className="mt-6 w-full bg-yellow-400 text-gray-800 font-bold py-2 rounded shadow"
          >
            Calculate Repayments
          </button>
        </div>
        <div className="p-8 w-1/2 bg-gray-800 text-white">
          <h2 className="text-lg font-bold">Your results</h2>
          <p className="mt-2 text-sm">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate repayments” again.
          </p>
          {monthlyPayment && totalRepayment && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-yellow-400">
                £{monthlyPayment}
              </h3>
              <p className="mt-2 text-sm">Your monthly repayments</p>
              <div className="border-t border-gray-600 mt-4"></div>
              <h3 className="text-lg font-bold mt-4">
                £{totalRepayment}
              </h3>
              <p className="mt-2 text-sm">Total you'll repay over the term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
