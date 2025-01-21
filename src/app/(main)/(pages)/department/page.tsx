export default function Department() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <header className="w-full bg-gradient-to-r from-orange-300 to-red-500 p-8 text-center">
        <h1 className="text-4xl font-extrabold capitalize tracking-tighter md:text-5xl">
          Department
        </h1>
        <p className="mt-2 text-lg md:text-xl">
          Explore our specialized departments and their unique offerings
        </p>
      </header>
      <main className="w-full max-w-6xl px-6 py-10">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Overview
          </h2>
          <p className="text-gray-400">
            Our college is home to multiple departments that focus on providing
            quality education, cutting-edge research opportunities, and
            practical training. Each department is designed to equip students
            with specialized knowledge and skills to excel in their careers.
          </p>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Departments List
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Department Items */}
            {/* Repeat for other departments */}
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Faculty
          </h2>
          <p className="text-gray-400">
            Our faculty comprises experienced professors and researchers who are
            dedicated to guiding students in achieving their academic and career
            goals. With expertise in diverse fields, they bring cutting-edge
            knowledge and practical insights to the classroom.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-orange-600 pb-2">
            Contact the Department
          </h2>
          <p className="text-gray-400 mb-6">
            For any queries about our departments, feel free to reach out to us
            via email or phone. We're happy to assist you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all">
              <h3 className="text-xl font-bold text-orange-500">Email</h3>
              <p className="mt-2 text-sm text-gray-400">
                department@college.edu
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all">
              <h3 className="text-xl font-bold text-orange-500">Phone</h3>
              <p className="mt-2 text-sm text-gray-400">+1 234-567-890</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
