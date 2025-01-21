export default function Programs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <header className="w-full bg-teal-800 p-6 text-center">
        <h1 className="text-4xl font-extrabold capitalize tracking-tighter md:text-5xl">
          Programs
        </h1>
        <p className="mt-2 text-lg md:text-xl">
          Explore diverse academic programs tailored for your success
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl px-6 py-10">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-teal-500 pb-2">
            Program Highlights
          </h2>
          <p className="text-gray-400">
            Our programs are designed to provide a blend of theoretical
            knowledge and practical skills. They focus on preparing students for
            a variety of careers in the ever-evolving world of technology.
          </p>
        </section>

        {/* Programs Offered Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-teal-500 pb-2">
            Programs Offered
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold">
                Bachelor of Science in Computer Science
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Dive into the world of algorithms, programming, and data
                analysis, mastering the tools and techniques for building
                advanced software systems.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold">
                Bachelor of Science in Information Technology
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Focuses on the practical applications of computers and software
                to solve business problems. Build the skills to manage IT
                systems in various industries.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold">
                Bachelor of Science in Data Science
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Learn how to use scientific methods, algorithms, and systems to
                extract insights from data, turning raw information into
                actionable intelligence.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold">Master&apos;s Programs</h3>
              <p className="mt-2 text-sm text-gray-400">
                Deepen your knowledge and expertise with our Master&apos;s
                programs, designed for those looking to specialize in their
                chosen fields.
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold">PhD Programs</h3>
              <p className="mt-2 text-sm text-gray-400">
                Engage in groundbreaking research and contribute to the
                advancement of knowledge with our PhD programs, offering the
                highest level of academic rigor.
              </p>
            </div>
          </div>
        </section>

        {/* Admission Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-teal-500 pb-2">
            Admission Process
          </h2>
          <p className="text-gray-400 mb-6">
            Understand the admission criteria, deadlines, and how to apply for
            your desired program. Whether you&apos;re a domestic or
            international applicant, we guide you every step of the way.
          </p>
          <a
            href="/admission"
            className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700 transition-all duration-300"
          >
            View Admission Details
          </a>
        </section>

        {/* Testimonials */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-teal-500 pb-2">
            Testimonials
          </h2>
          <p className="text-gray-400">
            Hear from our alumni about how our programs shaped their careers and
            lives. Their stories reflect the impact our education has had in the
            real world.
          </p>
        </section>
      </main>
    </div>
  );
}
