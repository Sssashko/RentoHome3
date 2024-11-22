import { useState } from 'react'
import { Home } from 'types'

import { Portal } from 'components/ui'

import { EditListing, Preview } from './components'

const Listing = (home: Home) => {
	const [editHome, setEditHome] = useState(false)
	const { id, model, year, price, images } = home

	console.log(editHome)
	
	return (
		<>
			<div
				className="w-full max-w-[370px] rounded-lg bg-neutral-700 text-white"
				key={images[0].originalName}
			>
				<Preview id={id} image={images[0]} setEditHome={setEditHome} />

				<div className="mx-4 mb-2 mt-1">
					<h1 className="text-xl font-semibold">{model}</h1>
					<div className="mt-0.5 flex justify-between text-xl">
						<h2 className="text-xl font-semibold">{year}</h2>
						<h2 className="text-xl font-semibold">
							${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
						</h2>
					</div>
				</div>
			</div>
			{editHome && (
				<Portal>
					<EditListing {...home} closeModal={() => setEditHome(false)} />
				</Portal>
			)}
		</>
	)
}

export default Listing
