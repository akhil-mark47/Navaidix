import { useState } from 'react'

const JobSearch = () => {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: '',
  })

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="jobs" className="section bg-lightgray">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Find Your Perfect Role</h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Job title or keywords"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="City or country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                <option value="technology">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
          <button className="btn-primary w-full mt-6">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  )
}

export default JobSearch