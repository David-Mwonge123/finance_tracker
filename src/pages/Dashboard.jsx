function Dashboard() {
  return (
    <div className="p-5 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold">Finance Tracker</h1>
      <p className="text-gray-500 mb-5">November 2026</p>

      <div className="flex gap-4">
        <div className="bg-white p-5 rounded-xl flex-1 shadow">
          <p className="text-gray-500">Total Balance</p>
          <h2 className="text-2xl font-bold">KSh 12,400</h2>
        </div>

        <div className="bg-white p-5 rounded-xl flex-1 shadow">
          <p className="text-gray-500">Income</p>
          <h2 className="text-2xl font-bold text-green-600">KSh 20,000</h2>
        </div>

        <div className="bg-white p-5 rounded-xl flex-1 shadow">
          <p className="text-gray-500">Expenses</p>
          <h2 className="text-2xl font-bold text-red-600">KSh 7,600</h2>
        </div>
      </div>

      <h3 className="mt-8 text-xl font-semibold">Recent Transactions</h3>
      <ul className="mt-3 space-y-2">
        <li className="bg-white p-3 rounded-lg shadow-sm">
          Lunch - KSh 500 - Mpesa
        </li>
        <li className="bg-white p-3 rounded-lg shadow-sm">
          HELB - KSh 20,000 - Bank
        </li>
        <li className="bg-white p-3 rounded-lg shadow-sm">
          Airtime - KSh 200 - Mpesa
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
