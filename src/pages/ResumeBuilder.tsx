// src/pages/ResumeBuilder.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";

const ResumeBuilder = () => {
  const [activeSection, setActiveSection] = useState("personal");
  const [resumeData, setResumeData] = useState({
    personal: {
      name: "Rahul Sharma",
      email: "rahul.sharma@iitb.ac.in",
      phone: "+91 9876543210",
      location: "Mumbai, India",
      linkedin: "linkedin.com/in/rahulsharma",
      website: "rahulsharma.dev",
    },
    education: [
      {
        id: "edu1",
        institution: "IIT Bombay",
        degree: "B.Tech in Computer Science",
        year: "2018-2022",
        score: "9.2 CGPA",
        highlights: "Dean's List, Merit Scholarship",
      },
    ],
    experience: [
      {
        id: "exp1",
        company: "Tech Innovations",
        role: "Software Engineer",
        location: "Mumbai",
        duration: "Jun 2022 - Present",
        description:
          "• Developed a scalable microservices architecture using Node.js and React\n• Improved API response time by 40% through query optimization\n• Led a team of 3 developers for a client project",
        technologies: ["React", "Node.js", "MongoDB", "AWS"],
      },
    ],
    projects: [
      {
        id: "proj1",
        title: "AI-powered Resume Analyzer",
        duration: "Jan 2021 - May 2021",
        description:
          "Built an ML model to analyze resumes and provide improvement recommendations",
        technologies: ["Python", "TensorFlow", "NLP", "Flask"],
        link: "github.com/rahulsharma/resume-analyzer",
      },
    ],
    skills: [
      { id: "skill1", name: "JavaScript", level: "Expert" },
      { id: "skill2", name: "React", level: "Expert" },
      { id: "skill3", name: "Node.js", level: "Advanced" },
      { id: "skill4", name: "Python", level: "Intermediate" },
      { id: "skill5", name: "Machine Learning", level: "Intermediate" },
    ],
  });

  const handlePersonalInfoChange = (field, value) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value,
      },
    });
  };

  const addSkill = () => {
    const newId = `skill${resumeData.skills.length + 1}`;
    setResumeData({
      ...resumeData,
      skills: [
        ...resumeData.skills,
        {
          id: newId,
          name: "",
          level: "Intermediate",
        },
      ],
    });
  };

  const removeSkill = (id) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    });
  };

  const [previewMode, setPreviewMode] = useState(false);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Resume Builder</h1>
          <div className="space-x-2">
            <Button
              variant={previewMode ? "outline" : "default"}
              onClick={() => setPreviewMode(false)}
              className={!previewMode ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Edit
            </Button>
            <Button
              variant={previewMode ? "default" : "outline"}
              onClick={() => setPreviewMode(true)}
              className={previewMode ? "bg-blue-600 hover:bg-blue-700" : ""}
            >
              Preview
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              Save Resume
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          {!previewMode && (
            <div className="w-full md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resume Sections</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Tabs
                    orientation="vertical"
                    value={activeSection}
                    onValueChange={setActiveSection}
                  >
                    <TabsList className="flex flex-col h-auto w-full rounded-none">
                      <TabsTrigger
                        value="personal"
                        className="justify-start rounded-none"
                      >
                        Personal Information
                      </TabsTrigger>
                      <TabsTrigger
                        value="education"
                        className="justify-start rounded-none"
                      >
                        Education
                      </TabsTrigger>
                      <TabsTrigger
                        value="experience"
                        className="justify-start rounded-none"
                      >
                        Work Experience
                      </TabsTrigger>
                      <TabsTrigger
                        value="projects"
                        className="justify-start rounded-none"
                      >
                        Projects
                      </TabsTrigger>
                      <TabsTrigger
                        value="skills"
                        className="justify-start rounded-none"
                      >
                        Skills
                      </TabsTrigger>
                      <TabsTrigger
                        value="additional"
                        className="justify-start rounded-none"
                      >
                        Additional Sections
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-blue-300 rounded p-1 cursor-pointer bg-blue-50">
                      <div className="bg-gray-200 h-20 mb-1"></div>
                      <p className="text-xs text-center">IIT Classic</p>
                    </div>
                    <div className="border border-gray-300 rounded p-1 cursor-pointer hover:border-blue-300">
                      <div className="bg-gray-200 h-20 mb-1"></div>
                      <p className="text-xs text-center">IIM Standard</p>
                    </div>
                    <div className="border border-gray-300 rounded p-1 cursor-pointer hover:border-blue-300">
                      <div className="bg-gray-200 h-20 mb-1"></div>
                      <p className="text-xs text-center">Modern</p>
                    </div>
                    <div className="border border-gray-300 rounded p-1 cursor-pointer hover:border-blue-300">
                      <div className="bg-gray-200 h-20 mb-1"></div>
                      <p className="text-xs text-center">Minimal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <div className={`w-full ${!previewMode ? "md:w-3/4" : ""}`}>
            {previewMode ? (
              // Resume Preview
              <Card
                className="px-8 py-10 min-h-[1000px] print:shadow-none"
                id="resume-preview"
              >
                <h1 className="text-2xl font-bold text-center">
                  {resumeData.personal.name}
                </h1>
                <div className="flex flex-wrap justify-center gap-x-4 mt-2 text-sm text-gray-600 mb-6">
                  <span>{resumeData.personal.email}</span>
                  <span>|</span>
                  <span>{resumeData.personal.phone}</span>
                  <span>|</span>
                  <span>{resumeData.personal.location}</span>
                  <span>|</span>
                  <span>{resumeData.personal.linkedin}</span>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
                    Education
                  </h2>
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="mb-3">
                      <div className="flex justify-between">
                        <div className="font-bold">{edu.institution}</div>
                        <div>{edu.year}</div>
                      </div>
                      <div className="flex justify-between">
                        <div>{edu.degree}</div>
                        <div>{edu.score}</div>
                      </div>
                      {edu.highlights && (
                        <div className="text-sm">{edu.highlights}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
                    Experience
                  </h2>
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id} className="mb-4">
                      <div className="flex justify-between">
                        <div className="font-bold">{exp.company}</div>
                        <div>{exp.duration}</div>
                      </div>
                      <div className="flex justify-between">
                        <div className="italic">{exp.role}</div>
                        <div>{exp.location}</div>
                      </div>
                      <div className="whitespace-pre-line text-sm mt-1">
                        {exp.description}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
                    Projects
                  </h2>
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="mb-3">
                      <div className="flex justify-between">
                        <div className="font-bold">{proj.title}</div>
                        <div>{proj.duration}</div>
                      </div>
                      <div className="text-sm mt-1">{proj.description}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.technologies.map((tech, i) => (
                          <span key={i} className="text-xs text-gray-600">
                            {tech}
                            {i < proj.technologies.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-2">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill) => (
                      <Badge
                        key={skill.id}
                        variant="outline"
                        className="py-1 px-2"
                      >
                        {skill.name} ({skill.level})
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ) : (
              // Resume Editor
              <Card className="p-6">
                <TabsContent value="personal" className="mt-0">
                  <h2 className="text-xl font-bold mb-4">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={resumeData.personal.name}
                        onChange={(e) =>
                          handlePersonalInfoChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={resumeData.personal.email}
                        onChange={(e) =>
                          handlePersonalInfoChange("email", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={resumeData.personal.phone}
                        onChange={(e) =>
                          handlePersonalInfoChange("phone", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={resumeData.personal.location}
                        onChange={(e) =>
                          handlePersonalInfoChange("location", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={resumeData.personal.linkedin}
                        onChange={(e) =>
                          handlePersonalInfoChange("linkedin", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website/Portfolio</Label>
                      <Input
                        id="website"
                        value={resumeData.personal.website}
                        onChange={(e) =>
                          handlePersonalInfoChange("website", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Education</h2>
                    <Button
                      onClick={() => {
                        const newId = `edu${resumeData.education.length + 1}`;
                        setResumeData({
                          ...resumeData,
                          education: [
                            ...resumeData.education,
                            {
                              id: newId,
                              institution: "",
                              degree: "",
                              year: "",
                              score: "",
                              highlights: "",
                            },
                          ],
                        });
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add Education
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <Card key={edu.id} className="border border-gray-200">
                        <CardContent className="pt-6 pb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label>Institution</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) => {
                                  const newEducation = [
                                    ...resumeData.education,
                                  ];
                                  newEducation[index].institution =
                                    e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    education: newEducation,
                                  });
                                }}
                                placeholder="e.g., IIT Bombay"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => {
                                  const newEducation = [
                                    ...resumeData.education,
                                  ];
                                  newEducation[index].degree = e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    education: newEducation,
                                  });
                                }}
                                placeholder="e.g., B.Tech in Computer Science"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Year</Label>
                              <Input
                                value={edu.year}
                                onChange={(e) => {
                                  const newEducation = [
                                    ...resumeData.education,
                                  ];
                                  newEducation[index].year = e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    education: newEducation,
                                  });
                                }}
                                placeholder="e.g., 2018-2022"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Score</Label>
                              <Input
                                value={edu.score}
                                onChange={(e) => {
                                  const newEducation = [
                                    ...resumeData.education,
                                  ];
                                  newEducation[index].score = e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    education: newEducation,
                                  });
                                }}
                                placeholder="e.g., 9.2 CGPA or 85%"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Highlights (optional)</Label>
                            <Input
                              value={edu.highlights}
                              onChange={(e) => {
                                const newEducation = [...resumeData.education];
                                newEducation[index].highlights = e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  education: newEducation,
                                });
                              }}
                              placeholder="e.g., Dean's List, Merit Scholarship"
                            />
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (resumeData.education.length > 1) {
                                  setResumeData({
                                    ...resumeData,
                                    education: resumeData.education.filter(
                                      (_, i) => i !== index
                                    ),
                                  });
                                }
                              }}
                              disabled={resumeData.education.length <= 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Work Experience</h2>
                    <Button
                      onClick={() => {
                        const newId = `exp${resumeData.experience.length + 1}`;
                        setResumeData({
                          ...resumeData,
                          experience: [
                            ...resumeData.experience,
                            {
                              id: newId,
                              company: "",
                              role: "",
                              location: "",
                              duration: "",
                              description: "",
                              technologies: [],
                            },
                          ],
                        });
                      }}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add Experience
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <Card key={exp.id} className="border border-gray-200">
                        <CardContent className="pt-6 pb-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => {
                                  const newExperience = [
                                    ...resumeData.experience,
                                  ];
                                  newExperience[index].company = e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    experience: newExperience,
                                  });
                                }}
                                placeholder="e.g., Tech Innovations"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Role</Label>
                              <Input
                                value={exp.role}
                                onChange={(e) => {
                                  const newExperience = [
                                    ...resumeData.experience,
                                  ];
                                  newExperience[index].role = e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    experience: newExperience,
                                  });
                                }}
                                placeholder="e.g., Software Engineer"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) => {
                                  const newExperience = [
                                    ...resumeData.experience,
                                  ];
                                  newExperience[index].location =
                                    e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    experience: newExperience,
                                  });
                                }}
                                placeholder="e.g., Mumbai"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Duration</Label>
                              <Input
                                value={exp.duration}
                                onChange={(e) => {
                                  const newExperience = [
                                    ...resumeData.experience,
                                  ];
                                  newExperience[index].duration =
                                    e.target.value;
                                  setResumeData({
                                    ...resumeData,
                                    experience: newExperience,
                                  });
                                }}
                                placeholder="e.g., Jun 2022 - Present"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 mb-4">
                            <Label>Description</Label>
                            <Textarea
                              rows={4}
                              value={exp.description}
                              onChange={(e) => {
                                const newExperience = [
                                  ...resumeData.experience,
                                ];
                                newExperience[index].description =
                                  e.target.value;
                                setResumeData({
                                  ...resumeData,
                                  experience: newExperience,
                                });
                              }}
                              placeholder="Describe your responsibilities and achievements. Use bullet points with • symbol."
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Technologies/Skills Used</Label>
                            <Input
                              value={
                                exp.technologies
                                  ? exp.technologies.join(", ")
                                  : ""
                              }
                              onChange={(e) => {
                                const newExperience = [
                                  ...resumeData.experience,
                                ];
                                newExperience[index].technologies =
                                  e.target.value
                                    .split(",")
                                    .map((tech) => tech.trim());
                                setResumeData({
                                  ...resumeData,
                                  experience: newExperience,
                                });
                              }}
                              placeholder="e.g., React, Node.js, MongoDB"
                            />
                          </div>

                          <div className="flex justify-end mt-4">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (resumeData.experience.length > 1) {
                                  setResumeData({
                                    ...resumeData,
                                    experience: resumeData.experience.filter(
                                      (_, i) => i !== index
                                    ),
                                  });
                                }
                              }}
                              disabled={resumeData.experience.length <= 1}
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="mt-0">
                  {/* Projects editor content, similar to experience */}
                </TabsContent>

                <TabsContent value="skills" className="mt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Skills</h2>
                    <Button
                      onClick={addSkill}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Add Skill
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {resumeData.skills.map((skill, index) => (
                      <div key={skill.id} className="flex gap-2 items-center">
                        <div className="flex-grow">
                          <Input
                            value={skill.name}
                            onChange={(e) => {
                              const newSkills = [...resumeData.skills];
                              newSkills[index].name = e.target.value;
                              setResumeData({
                                ...resumeData,
                                skills: newSkills,
                              });
                            }}
                            placeholder="e.g., JavaScript"
                          />
                        </div>
                        <div className="w-32">
                          <select
                            value={skill.level}
                            onChange={(e) => {
                              const newSkills = [...resumeData.skills];
                              newSkills[index].level = e.target.value;
                              setResumeData({
                                ...resumeData,
                                skills: newSkills,
                              });
                            }}
                            className="w-full p-2 border rounded"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Expert">Expert</option>
                          </select>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSkill(skill.id)}
                          disabled={resumeData.skills.length <= 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6L6 18M6 6l12 12"></path>
                          </svg>
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="additional" className="mt-0">
                  <h2 className="text-xl font-bold mb-4">
                    Additional Sections
                  </h2>
                  <p className="text-gray-500 mb-4">
                    Add optional sections to your resume
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Certifications</h3>
                        <p className="text-sm text-gray-500">
                          Add professional certifications and courses
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Awards & Achievements</h3>
                        <p className="text-sm text-gray-500">
                          Highlight recognitions and awards
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Languages</h3>
                        <p className="text-sm text-gray-500">
                          Add languages you speak and proficiency levels
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Publications</h3>
                        <p className="text-sm text-gray-500">
                          Include research papers or articles
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Volunteer Experience</h3>
                        <p className="text-sm text-gray-500">
                          Add community service and volunteer work
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </TabsContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeBuilder;
