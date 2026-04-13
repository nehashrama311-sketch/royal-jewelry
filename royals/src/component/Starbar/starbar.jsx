import React from 'react'

export const StatsBar = () =>  {
  return (
    <>
      (
  <div className="stats-bar">
    {[
      ["25+", "Years of Craftsmanship"],
      ["10,000+", "Happy Customers"],
      ["500+", "Unique Designs"],
      ["100%", "Ethically Sourced"]
    ].map(([num, label]) => (
      <div className="stat-item" key={label}>
        <span className="stat-number">{num}</span>
        <span className="stat-label">{label}</span>
      </div>
    ))}
  </div>
);</>
  )
}
