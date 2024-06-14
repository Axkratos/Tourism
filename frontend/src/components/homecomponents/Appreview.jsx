import React from 'react'

const Appreview = () => {


  const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
  ]
  return (
    <section
    id="comparison"
    aria-label="QuickEdit vs traditional editor"
    className="bg-slate-50 dark:bg-gray-800 py-20 sm:py-32"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl md:text-center">
        <h2 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white sm:text-4xl">
        Empowering Communities, Enriching Journeys
        </h2>
        <p className="mt-4 text-lg tracking-tight text-slate-700 dark:text-gray-300">
       
        "Transforming lives through sustainable tourism. Empowering locals, boosting economies, and enriching your travel experience."
        </p>
      </div>
      <ul
  role="list"
  className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3 px-4"
>
  <li>
    <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
      <li>
        <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 transition-transform transform hover:scale-105">
          <blockquote className="relative p-3">
            <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              98% Faster
            </p>
          </blockquote>
          <figcaption className="text-center">
            <div className="font-display text-slate-900 dark:text-white mt-2">
              Find Your Perfect Guide in Minutes
            </div>
          </figcaption>
        </figure>
      </li>
    </ul>
  </li>
  <li>
    <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
      <li>
        <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 transition-transform transform hover:scale-105">
          <blockquote className="relative p-3">
            <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Authentic Experience
            </p>
          </blockquote>
          <figcaption className="text-center">
            <div className="font-display text-slate-900 dark:text-white mt-2">
              Immerse yourself in local culture.
            </div>
          </figcaption>
        </figure>
      </li>
    </ul>
  </li>
  <li>
    <ul role="list" className="flex flex-col gap-y-6 sm:gap-y-8">
      <li>
        <figure className="relative rounded-2xl bg-white dark:bg-gray-900 p-6 text-center shadow-xl shadow-slate-900/10 transition-transform transform hover:scale-105">
          <blockquote className="relative p-3">
            <p className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sustainable Tourism
            </p>
          </blockquote>
          <figcaption className="text-center">
            <div className="font-display text-slate-900 dark:text-white mt-2">
              Support Local Community
            </div>
          </figcaption>
        </figure>
      </li>
    </ul>
  </li>
</ul>

    </div>
  </section>
  

  )
}

export default Appreview

