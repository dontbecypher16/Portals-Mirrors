const fortuneCookies = [    
    "Conquer your fears.",
    "Rivers need springs",
    "Do not fear the unknown",
    "A pleasant surprise"
  ]
   

  exports.getFortune = () => {
    const idx = Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
  }