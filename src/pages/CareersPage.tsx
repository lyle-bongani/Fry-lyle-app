import React from 'react';

export default function CareersPage() {
    const jobs = [
        {
            title: "Senior Software Engineer",
            department: "Engineering",
            location: "Remote",
            type: "Full-time"
        },
        {
            title: "Restaurant Partnership Manager",
            department: "Business Development",
            location: "New York, NY",
            type: "Full-time"
        },
        {
            title: "Marketing Specialist",
            department: "Marketing",
            location: "Los Angeles, CA",
            type: "Full-time"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Join Our Team</h1>
            <p className="text-gray-600 mb-8">
                Help us revolutionize the food delivery industry. We're always looking for talented individuals to join our team.
            </p>

            <div className="space-y-6">
                {jobs.map((job, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                        <div className="mt-2 space-y-2">
                            <p className="text-gray-600">Department: {job.department}</p>
                            <p className="text-gray-600">Location: {job.location}</p>
                            <p className="text-gray-600">Type: {job.type}</p>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                            Apply Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
} 