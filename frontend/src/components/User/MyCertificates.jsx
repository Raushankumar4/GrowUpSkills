import React from 'react';

const MyCertificates = () => {

  const certificates = [
    {
      courseTitle: "Web Development Bootcamp",
      image: "https://via.placeholder.com/400x300?text=Certificate+1",
      dateIssued: "2025-04-18T12:00:00Z",
      downloadLink: "https://example.com/certificate1.pdf"
    },
    {
      courseTitle: "React Mastery",
      image: "https://via.placeholder.com/400x300?text=Certificate+2",
      dateIssued: "2025-03-15T12:00:00Z",
      downloadLink: "https://example.com/certificate2.pdf"
    },
    {
      courseTitle: "Full Stack Developer",
      image: "https://via.placeholder.com/400x300?text=Certificate+3",
      dateIssued: "2025-02-20T12:00:00Z",
      downloadLink: "https://example.com/certificate3.pdf"
    }
  ];

  return (
    <div className="w-full min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 border-b pb-2">
        🎓 My Certificates <span className="text-purple-600">({certificates?.length || 0})</span>
      </h2>

      {certificates.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-20">
          <p className="text-xl font-medium">No Certificates Yet</p>
          <p className="text-sm mt-2">Complete a course to earn your first certificate!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <img
                src={cert.image}
                alt={`Certificate for ${cert.courseTitle}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{cert.courseTitle}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Issued on:{" "}
                  <span className="text-gray-700">
                    {new Date(cert.dateIssued).toLocaleDateString()}
                  </span>
                </p>
                <a
                  href={cert.downloadLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition"
                >
                  Download Certificate
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCertificates;
