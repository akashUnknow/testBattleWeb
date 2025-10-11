import React, { useState } from 'react';
import { ChevronDown, Search, BookOpen, GraduationCap, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const examCategories = {
    'SSC Exams': [
      { name: 'Delhi Police Constable', icon: '👮', path: '/exams/delhi-police-constable' },
      { name: 'SSC CGL', icon: '🎯', path: '/exams/ssc-cgl' },
      { name: 'SSC GD Constable', icon: '👮', path: '/exams/ssc-gd-constable' },
      { name: 'SSC MTS', icon: '🎯', path: '/exams/ssc-mts' },
      { name: 'SSC CPO', icon: '👮', path: '/exams/ssc-cpo' },
      { name: 'SSC CHSL', icon: '🎯', path: '/exams/ssc-chsl' },
      { name: 'SSC Head Constable', icon: '👮', path: '/exams/ssc-head-constable' },
      { name: 'Delhi Police Head Constable', icon: '👮', path: '/exams/delhi-police-head-constable' },
      { name: 'SSC Stenographer', icon: '📝', path: '/exams/ssc-stenographer' },
      { name: 'Delhi Police MTS', icon: '👮', path: '/exams/delhi-police-mts' },
      { name: 'IB Security Assistant', icon: '🛡️', path: '/exams/ib-security-assistant' },
      { name: 'SSC Selection Post', icon: '🎯', path: '/exams/ssc-selection-post' },
      { name: 'SSC JE CE', icon: '⚙️', path: '/exams/ssc-je-ce' },
      { name: 'SSC JE EE', icon: '⚡', path: '/exams/ssc-je-ee' },
      { name: 'SSC JHT', icon: '🌐', path: '/exams/ssc-jht' },
      { name: 'SSC JE ME', icon: '🔧', path: '/exams/ssc-je-me' },
      { name: 'SSC Scientific Assistant', icon: '🔬', path: '/exams/ssc-scientific-assistant' }
    ],
    'Banking Exams': [
      { name: 'IBPS PO', icon: '🏦', path: '/exams/ibps-po' },
      { name: 'IBPS Clerk', icon: '🏦', path: '/exams/ibps-clerk' },
      { name: 'SBI PO', icon: '🏦', path: '/exams/sbi-po' },
      { name: 'SBI Clerk', icon: '🏦', path: '/exams/sbi-clerk' },
      { name: 'RBI Grade B', icon: '🏦', path: '/exams/rbi-grade-b' },
      { name: 'IBPS RRB PO', icon: '🏦', path: '/exams/ibps-rrb-po' },
      { name: 'IBPS RRB Clerk', icon: '🏦', path: '/exams/ibps-rrb-clerk' },
      { name: 'IBPS SO', icon: '🏦', path: '/exams/ibps-so' }
    ],
    'Railway Exams': [
      { name: 'RRB NTPC', icon: '🚂', path: '/exams/rrb-ntpc' },
      { name: 'RRB JE', icon: '🚂', path: '/exams/rrb-je' },
      { name: 'RRB Group D', icon: '🚂', path: '/exams/rrb-group-d' },
      { name: 'RRB ALP', icon: '🚂', path: '/exams/rrb-alp' },
      { name: 'RRB RPF', icon: '👮', path: '/exams/rrb-rpf' }
    ],
    'Teaching Exams': [
      { name: 'CTET', icon: '👨‍🏫', path: '/exams/ctet' },
      { name: 'UPTET', icon: '👨‍🏫', path: '/exams/uptet' },
      { name: 'DSSSB TGT', icon: '👨‍🏫', path: '/exams/dsssb-tgt' },
      { name: 'DSSSB PGT', icon: '👨‍🏫', path: '/exams/dsssb-pgt' },
      { name: 'KVS', icon: '👨‍🏫', path: '/exams/kvs' }
    ],
    'Defence Exams': [
      { name: 'NDA', icon: '🎖️', path: '/exams/nda' },
      { name: 'CDS', icon: '🎖️', path: '/exams/cds' },
      { name: 'AFCAT', icon: '✈️', path: '/exams/afcat' },
      { name: 'Indian Army', icon: '🎖️', path: '/exams/indian-army' },
      { name: 'Indian Navy', icon: '⚓', path: '/exams/indian-navy' }
    ],
    'State Exams': [
      { name: 'UPSC CSE', icon: '🏛️', path: '/exams/upsc-cse' },
      { name: 'State PSC', icon: '🏛️', path: '/exams/state-psc' },
      { name: 'UPPSC', icon: '🏛️', path: '/exams/uppsc' },
      { name: 'MPPSC', icon: '🏛️', path: '/exams/mppsc' },
      { name: 'BPSC', icon: '🏛️', path: '/exams/bpsc' }
    ]
  };

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-cyan-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              testbook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Exams Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('exams')}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-700">Exams</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'exams' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'exams' && (
                <div className="absolute left-0 top-full mt-2 w-screen max-w-5xl bg-white rounded-lg shadow-2xl border border-gray-100 p-6">
                  <div className="grid grid-cols-3 gap-6">
                    {Object.entries(examCategories).map(([category, exams]) => (
                      <div key={category} className="space-y-3">
                        <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center space-x-2 pb-2 border-b border-gray-200">
                          <GraduationCap className="w-4 h-4 text-cyan-500" />
                          <span>{category}</span>
                        </h3>
                        <ul className="space-y-2">
                          {exams.map((exam) => (
                            <li key={exam.name}>
                              <Link
                                to={exam.path}
                                onClick={closeDropdown}
                                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-cyan-50 transition-colors group"
                              >
                                <span className="text-lg">{exam.icon}</span>
                                <span className="text-sm text-gray-600 group-hover:text-cyan-600 transition-colors">
                                  {exam.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            <Link to="/super-coaching" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700">
              SuperCoaching
            </Link>
            <Link to="/test-series" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700">
              Test Series
            </Link>
            <Link to="/skill-academy" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700">
              Skill Academy
            </Link>
            <Link to="/pass" className="px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700">
              Pass
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <Link to="/dashboard" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              <details className="group">
                <summary className="px-4 py-2 font-medium text-gray-700 cursor-pointer hover:bg-gray-100 rounded-lg flex items-center justify-between">
                  Exams
                  <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="mt-2 space-y-4 px-4 max-h-96 overflow-y-auto">
                  {Object.entries(examCategories).map(([category, exams]) => (
                    <div key={category}>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">{category}</h4>
                      <ul className="space-y-1 ml-4">
                        {exams.map((exam) => (
                          <li key={exam.name}>
                            <Link 
                              to={exam.path}
                              onClick={closeDropdown}
                              className="text-sm text-gray-600 hover:text-cyan-600 flex items-center space-x-2 py-1"
                            >
                              <span>{exam.icon}</span>
                              <span>{exam.name}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
              <Link to="/super-coaching" onClick={closeDropdown} className="block px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                SuperCoaching
              </Link>
              <Link to="/test-series" onClick={closeDropdown} className="block px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                Test Series
              </Link>
              <Link to="/skill-academy" onClick={closeDropdown} className="block px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                Skill Academy
              </Link>
              <Link to="/dashboard" onClick={closeDropdown} className="block w-full mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;