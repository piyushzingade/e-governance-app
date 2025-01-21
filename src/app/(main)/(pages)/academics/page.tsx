import Image from "next/image";

export default function Academics() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <header className="w-full bg-gradient-to-r from-blue-800 to-purple-800 p-6 text-center">
        <h1 className="text-4xl font-extrabold capitalize tracking-tighter md:text-5xl">
          Academics
        </h1>
        <p className="mt-2 text-lg md:text-xl max-w-4xl mx-auto">
          Explore our developments, programs, academic resources, and take the
          first step toward academic excellence
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-6xl px-6 py-10">
        {/* Departments Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Our Departments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-vQ5EeNvTWXeTZkMetT9TtO-VXZR9Ke8rpg&s"
                alt="Information Technology"
                className="rounded-md mb-4"
                width={300} // specify the width
                height={200} // specify the height
              />

              <h3 className="text-xl font-bold">Informarion Technology</h3>
              <p className="mt-2 text-sm text-gray-400">
                Learn how to use computers, software, and modern technology to
                solve real-world problems effectively.
              </p>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
              <Image
                src="https://thumbs.dreamstime.com/b/line-web-concept-computer-science-vector-banner-education-open-path-76284593.jpg"
                alt="Computer Science"
                className="rounded-md mb-4"
                width={300} // specify the width
                height={200} // specify the height
              />

              <h3 className="text-xl font-bold "> Computer Science</h3>
              <p className="mt-2 text-sm text-gray-600">
                Dive into algorithms, data structures, and the core principles
                that drive computer systems and software development.
              </p>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2RzGeikAnS5cPgbYPavFrQmzbb6FVoTjWPw&s"
                alt="Data Science"
                className="rounded-md mb-4"
                width={300} // specify the width
                height={200} // specify the height
              />
              <h3 className="text-xl font-bold">Data Science</h3>
              <p className="mt-2 text-sm text-gray-400">
                Understand the tools and methods used to extract meaningful
                insiights from large sets of data using machine learning and
                analytics
              </p>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Programs We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-400">
            <li className="mb-2">
              <strong>Bachelor of Science (B.Sc):</strong> Dive deep into the
              world of computer science and technology with foundational and
              advanced coursework.
            </li>
            <li className="mb-2">
              <strong>Master of Technology (M.TEch) :</strong> Focus on advanced
              topics and research with an emphasis on real-world applications in
              technology
            </li>
            <li className="mb-2">
              <strong>Doctoral Programs (Ph.D.) : </strong> Engage in innovative
              research that can contribute to the advancement of technology and
              academic fields.
            </li>
          </ul>
        </section>

        {/* Resources Section */}
        <section>
          <h2 className="text-3xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">
            Academic Resources
          </h2>
          <p className="text-gray-400 mb-6">
            Access our world-class resources to enhance your academic journey,
            including state of the art labs, libraries, and online learning
            platforms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAu_fqmpeZICRYcwUXP3evuWeuTNXCFnQiLA&s"
                alt="Library"
                className="rounded-md mb-4"
                width={300}
                height={200}
              />
              <h3 className="text-xl font-bold">Library</h3>
              <p className="mt-2 text-sm text-gray-400">
                A comprehensive collection of books, journals, research papers,
                and e-resources designed to support your academic and research
                needs.
              </p>
            </div>
            {/* <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 "> */}
            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOQt1okTlMih-v1T_HToTOSYXsPO3bj833Hw&s"
                alt="Research Labs"
                className="rounded-md mb-4 "
                width={300}
                height={200}
              />
              <h3 className="text-xl font-bold">Research Labs</h3>
              <p className="mt-2 text-sm text-gray-400">
                Access cutting-edge research labs and facilities designed to
                foster innovation, collaboration, and technological advancement.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
