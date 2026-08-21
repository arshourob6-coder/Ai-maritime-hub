import React, { useState } from 'react';
import { SAMPLE_COURSES, FORMULA_LIBRARY, MARITIME_DICTIONARY } from '../data/maritimeData';
import { Course } from '../types';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  BookOpen,
  Search,
  Award,
  Download,
  Star,
  Users,
  X
} from 'lucide-react';

export const LearningHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'formulas' | 'dictionary'>('courses');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [certificateEarned, setCertificateEarned] = useState(false);

  const filteredCourses = SAMPLE_COURSES.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFormulas = FORMULA_LIBRARY.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDict = MARITIME_DICTIONARY.filter((d) =>
    d.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.definition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-white">Maritime Academy & Learning Hub</h2>
            <p className="text-xs text-slate-400">Class society certified courses, engineering formula library & STCW quiz modules</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search courses, formulas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'courses', label: '1. Certified Courses', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'formulas', label: '2. Engineering Formula Sheet', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'dictionary', label: '3. Maritime Dictionary', icon: <Search className="w-4 h-4" /> },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === t.id
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {t.icon}
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* COURSES TAB */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 rounded-2xl overflow-hidden shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-300">
                    {course.category}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {course.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {course.enrolled} Enrolled
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{course.description}</p>
                  <p className="text-[11px] text-sky-400 font-medium">Instructor: {course.instructor}</p>
                </div>
              </div>

              <div className="p-5 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-base font-extrabold text-amber-400 font-mono">
                  ${course.priceUSD} <span className="text-[10px] text-slate-500 font-normal">/ lifetime</span>
                </span>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Start Learning</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FORMULAS TAB */}
      {activeTab === 'formulas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-amber-400">Naval Architecture Core Equation Index</h3>
            <button
              onClick={() => alert("Downloading Official Naval Architecture Equation Sheet PDF...")}
              className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-xs font-semibold rounded-xl text-sky-300 hover:bg-slate-800 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Formula Sheet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFormulas.map((f, i) => (
              <div key={i} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{f.name}</h4>
                  <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded text-sky-400 font-mono border border-slate-800">
                    {f.unit}
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-amber-300 font-bold border border-slate-800">
                  {f.formula}
                </div>
                <p className="text-xs text-slate-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DICTIONARY TAB */}
      {activeTab === 'dictionary' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDict.map((d, i) => (
            <div key={i} className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-1">
              <h4 className="font-bold text-sm text-sky-400">{d.term}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{d.definition}</p>
            </div>
          ))}
        </div>
      )}

      {/* Course Modal Player */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-2xl p-6 text-white space-y-4">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white">{selectedCourse.title}</h3>
            <p className="text-xs text-slate-400">Instructor: {selectedCourse.instructor}</p>

            <div className="aspect-video bg-black rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center relative">
              <video controls className="w-full h-full object-cover" poster={selectedCourse.thumbnail}>
                <source src={selectedCourse.modules[0]?.videoUrl} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <button
                onClick={() => setCertificateEarned(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                <Award className="w-4 h-4" />
                <span>Complete Course & Issue Certificate</span>
              </button>
            </div>

            {certificateEarned && (
              <div className="p-3 bg-emerald-950 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Certificate Issued! Saved to your User Dashboard.</span>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
