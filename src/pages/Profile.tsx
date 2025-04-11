// src/pages/Profile.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [profileData, setProfileData] = useState({
    personal: {
      fullName: "Rahul Sharma",
      email: "rahul.sharma@iitb.ac.in",
      phone: "+91 9876543210",
      location: "Mumbai, India",
      about:
        "IIT Bombay graduate with 3+ years of experience in software development and machine learning.",
    },
    education: [
      {
        id: "edu1",
        institution: "IIT Bombay",
        degree: "B.Tech in Computer Science",
        year: "2018-2022",
        score: "9.2 CGPA",
      },
    ],
    experience: [
      {
        id: "exp1",
        company: "Tech Innovations",
        role: "Software Engineer",
        duration: "2022-Present",
        description:
          "Developing scalable web applications using React and Node.js",
      },
    ],
  });

  const handlePersonalInfoUpdate = (e) => {
    e.preventDefault();
    // API call to update profile
    console.log("Profile updated:", profileData.personal);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">
                    {profileData.personal.fullName}
                  </h2>
                  <p className="text-gray-500 mb-4">IIT Graduate</p>
                  <div className="w-full mt-4 space-y-2">
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-gray-500"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>{profileData.personal.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-gray-500"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span>{profileData.personal.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 text-gray-500"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{profileData.personal.location}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                    Download Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="personal"
                  value={activeTab}
                  onValueChange={setActiveTab}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="space-y-4 pt-4">
                    <form onSubmit={handlePersonalInfoUpdate}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={profileData.personal.fullName}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                personal: {
                                  ...profileData.personal,
                                  fullName: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.personal.email}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                personal: {
                                  ...profileData.personal,
                                  email: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.personal.phone}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                personal: {
                                  ...profileData.personal,
                                  phone: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.personal.location}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                personal: {
                                  ...profileData.personal,
                                  location: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <Label htmlFor="about">About</Label>
                        <Textarea
                          id="about"
                          rows={4}
                          value={profileData.personal.about}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              personal: {
                                ...profileData.personal,
                                about: e.target.value,
                              },
                            })
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Changes
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="education" className="pt-4">
                    {/* Education form fields */}
                    <div className="space-y-4">
                      {profileData.education.map((edu, index) => (
                        <Card key={edu.id} className="border border-gray-200">
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label>Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => {
                                    const newEducation = [
                                      ...profileData.education,
                                    ];
                                    newEducation[index].institution =
                                      e.target.value;
                                    setProfileData({
                                      ...profileData,
                                      education: newEducation,
                                    });
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const newEducation = [
                                      ...profileData.education,
                                    ];
                                    newEducation[index].degree = e.target.value;
                                    setProfileData({
                                      ...profileData,
                                      education: newEducation,
                                    });
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Year</Label>
                                <Input
                                  value={edu.year}
                                  onChange={(e) => {
                                    const newEducation = [
                                      ...profileData.education,
                                    ];
                                    newEducation[index].year = e.target.value;
                                    setProfileData({
                                      ...profileData,
                                      education: newEducation,
                                    });
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Score</Label>
                                <Input
                                  value={edu.score}
                                  onChange={(e) => {
                                    const newEducation = [
                                      ...profileData.education,
                                    ];
                                    newEducation[index].score = e.target.value;
                                    setProfileData({
                                      ...profileData,
                                      education: newEducation,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const newId = `edu${
                            profileData.education.length + 1
                          }`;
                          setProfileData({
                            ...profileData,
                            education: [
                              ...profileData.education,
                              {
                                id: newId,
                                institution: "",
                                degree: "",
                                year: "",
                                score: "",
                              },
                            ],
                          });
                        }}
                      >
                        Add Education
                      </Button>

                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="pt-4">
                    {/* Experience form fields */}
                    <div className="space-y-4">
                      {profileData.experience.map((exp, index) => (
                        <Card key={exp.id} className="border border-gray-200">
                          <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => {
                                    const newExperience = [
                                      ...profileData.experience,
                                    ];
                                    newExperience[index].company =
                                      e.target.value;
                                    setProfileData({
                                      ...profileData,
                                      experience: newExperience,
                                    });
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Role</Label>
                                <Input
                                  value={exp.role}
                                  onChange={(e) => {
                                    const newExperience = [
                                      ...profileData.experience,
                                    ];
                                    newExperience[index].role = e.target.value;
                                    setProfileData({
                                      ...profileData,
                                      experience: newExperience,
                                    });
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Duration</Label>
                                <Input
                                  value={exp.duration}
                                  onChange={(e) => {
                                    const newExperience = [
                                      ...profileData.experience,
                                    ];
                                    newExperience[index].duration =
                                      e.target.value;
                                    setProfileData({
                                      ...profileData,
                                      experience: newExperience,
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                rows={3}
                                value={exp.description}
                                onChange={(e) => {
                                  const newExperience = [
                                    ...profileData.experience,
                                  ];
                                  newExperience[index].description =
                                    e.target.value;
                                  setProfileData({
                                    ...profileData,
                                    experience: newExperience,
                                  });
                                }}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          const newId = `exp${
                            profileData.experience.length + 1
                          }`;
                          setProfileData({
                            ...profileData,
                            experience: [
                              ...profileData.experience,
                              {
                                id: newId,
                                company: "",
                                role: "",
                                duration: "",
                                description: "",
                              },
                            ],
                          });
                        }}
                      >
                        Add Experience
                      </Button>

                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        Save Changes
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
