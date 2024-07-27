import Image from "next/image";

export default function Home() {
  return (
    <main className="min-w-screen flex min-h-screen flex-col items-center px-4">
      <div className="absolute h-full w-full">
        <div className="h-[15%] bg-gradient-to-r from-[#77d28c] to-[#4dbccf]"></div>
      </div>
      <div className="z-50 h-full w-full">
        <div className="mt-4 mb-4 flex w-full items-center justify-between gap-4">
          <i className="i-solar-arrow-left-outline size-6 bg-white" />
          <div className="flex grow flex-col text-white">
            <p className="text-sm">DELIVER TO</p>
            <p className="text-lg font-bold">Adrian</p>
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-white/30 backdrop-blur-3xl">
            <i className="i-solar-heart-angle-line-duotone size-6 bg-white" />
          </div>
          <div className="flex size-9 items-center justify-center rounded-full bg-white/30 backdrop-blur-3xl">
            <i className="i-solar-document-linear size-6 bg-white" />
          </div>
        </div>
        <div className="mb-4 flex h-12 items-center gap-2 rounded-md bg-white p-3 drop-shadow-lg">
          <i className="i-solar-minimalistic-magnifer-linear bg-black" />
          <p className="text-slate-500">What shall we deliver?</p>
        </div>
        <div className="mb-4 flex w-full justify-between">
          {["Delivery", "Dine Out Deals", "Pickup"].map((item) => {
            return (
              <div
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-200 p-2"
                key={item}
              >
                {item === "Delivery" && (
                  <i className="i-solar-scooter-line-duotone" />
                )}
                {item === "Dine Out Deals" && (
                  <i className="i-solar-chef-hat-linear" />
                )}
                {item === "Pickup" && <i className="i-solar-bag-2-linear" />}
                <p>{item}</p>
              </div>
            );
          })}
        </div>
        <div className="mb-4 flex justify-between">
          {["Beverages", "Breakfast", "Coffee", "Chicken", "Rice"].map(
            (item) => (
              <div key={item} className="text-center">
                <div className="mb-2 h-16 w-16 rounded-full bg-gray-200"></div>
                <span className="text-sm">{item}</span>
              </div>
            ),
          )}
        </div>
        <div className="mb-4 gap-3 flex bg-gradient-to-r from-yellow-200 to-red-300 drop-shadow-lg p-4 rounded-lg">
          <i className="i-solar-magic-stick-3-bold size-6" />
          <p className="text-base font-bold">Click here if you're confused!</p>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-pink-200 p-4">
            <h3 className="font-bold">Near Me</h3>
            <p className="text-sm">Get it quick</p>
          </div>
          <div className="rounded-lg bg-teal-200 p-4">
            <h3 className="font-bold">Discount</h3>
            <p className="text-sm">Best deal</p>
          </div>
          <div className="rounded-lg bg-orange-200 p-4">
            <h3 className="font-bold">24 Hours</h3>
            <p className="text-sm">Always open</p>
          </div>
          <div className="rounded-lg bg-green-200 p-4">
            <h3 className="font-bold">All-in from 22k</h3>
            <p className="text-sm">Full portion</p>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Pesan Sekarang</h2>
          <i className="i-solar-arrow-right-outline size-6" />
        </div>
        <div className="mb-4 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 p-4 text-white">
          <h2 className="text-xl font-bold">PAYDAY ESCAPE</h2>
          <p>26 - 28 JULY 2024</p>
          <p className="text-3xl font-bold">2 TALL SIZE</p>
          <p className="text-4xl font-bold">@Rp29 rb*</p>
          <button className="mt-2 rounded-full bg-white px-4 py-2 text-pink-500">
            Pesan sekarang!
          </button>
        </div>
      </div>
    </main>
    // <div className="bg-gradient-to-b from-teal-400 to-teal-500 min-h-screen p-4">
    //   <header className="flex justify-between items-center mb-4">
    //     <button className="text-white">←</button>
    //     <div className="text-white font-bold">DELIVER TO Stella ▼</div>
    //     <div className="flex space-x-2">
    //       <button className="bg-teal-300 p-2 rounded-full">❤️</button>
    //       <button className="bg-teal-300 p-2 rounded-full">📃</button>
    //     </div>
    //   </header>

    //   <div className="bg-white rounded-lg p-4 mb-4">
    //     <div className="flex items-center">
    //       <span className="text-gray-400 mr-2">🔍</span>
    //       <input
    //         type="text"
    //         placeholder="What shall we deliver?"
    //         className="w-full outline-none"
    //       />
    //     </div>
    //   </div>

    //   <div className="flex justify-between mb-4">
    //     <button className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full">
    //       🛵 Delivery
    //     </button>
    //     <button className="text-teal-700 px-4 py-2">
    //       % Dine Out Deals
    //     </button>
    //     <button className="text-teal-700 px-4 py-2">
    //       🛍️ Pickup
    //     </button>
    //   </div>

    // <div className="flex justify-between mb-4">
    //   {['Beverages', 'Breakfast', 'Coffee', 'Chicken', 'Rice'].map((item) => (
    //     <div key={item} className="text-center">
    //       <div className="bg-gray-200 w-16 h-16 rounded-full mb-2"></div>
    //       <span className="text-sm">{item}</span>
    //     </div>
    //   ))}
    // </div>

    // <div className="grid grid-cols-2 gap-4 mb-4">
    //   <div className="bg-pink-200 p-4 rounded-lg">
    //     <h3 className="font-bold">Near Me</h3>
    //     <p className="text-sm">Get it quick</p>
    //   </div>
    //   <div className="bg-teal-200 p-4 rounded-lg">
    //     <h3 className="font-bold">Discount up to 150k</h3>
    //     <p className="text-sm">Best deal on GrabFood</p>
    //   </div>
    //   <div className="bg-orange-200 p-4 rounded-lg">
    //     <h3 className="font-bold">24 Hours</h3>
    //     <p className="text-sm">Always open, always serving</p>
    //   </div>
    //   <div className="bg-green-200 p-4 rounded-lg">
    //     <h3 className="font-bold">All-in from 22k</h3>
    //     <p className="text-sm">Full portion & includes delivery!</p>
    //   </div>
    // </div>

    // <div className="flex justify-between items-center mb-4">
    //   <h2 className="text-xl font-bold">Pesan Sekarang</h2>
    //   <button className="text-teal-700">→</button>
    // </div>

    // <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-4 rounded-lg text-white mb-4">
    //   <h3 className="font-bold text-lg">STARBUCKS</h3>
    //   <h2 className="font-bold text-xl">PAYDAY ESCAPE</h2>
    //   <p>26 - 28 JULY 2024</p>
    //   <p className="text-3xl font-bold">2 TALL SIZE</p>
    //   <p className="text-4xl font-bold">@Rp29 rb*</p>
    //   <button className="bg-white text-pink-500 px-4 py-2 rounded-full mt-2">
    //     Pesan sekarang!
    //   </button>
    // </div>
    // </div>
  );
}
