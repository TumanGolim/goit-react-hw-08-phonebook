import { useEffect, useState } from 'react'
import {useLocation, useNavigate, useParams } from 'react-router-dom'
import { getSingleProduct } from '../api/products'

const ProductDetailsPage = () => {
	const { productId } = useParams()
	const [product, setProduct] = useState(null)

	const location = useLocation()

	const navigate = useNavigate()

	useEffect(() => {
		const getProduct = async () => {
			try {
				const data = await getSingleProduct(productId)
				setProduct(data)
			} catch (error) {
				console.error(error)
			}
		}

		productId && getProduct()
	}, [productId])

	const handelBack = () => {
		navigate(location.state ?? '/products', { state: 'qwe' })
	}

	return (
		product && (
			<div>
				<button onClick={handelBack}>go back</button>
	
				<h1>{product.title}</h1>
			</div>
		)
	)
}

export default ProductDetailsPage
