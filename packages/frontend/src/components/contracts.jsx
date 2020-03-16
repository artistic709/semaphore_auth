import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

// @param contract is an ethers.Contract instance
const ProofOfBurn = ({ contract }) => {
  const [data, setData] = useState({
    address: null,
    registrationFee: null,
    commitments: null
  })

  useEffect(() => {
    let didCancel = false
    const fetchContractData = async () => {
      const address = contract.address
      const registrationFee = (await contract.registration_fee()).toString()
      const commitments = (await contract.getIdentityCommitments()).length
      if (!didCancel) setData({ address, registrationFee, commitments })
    }
    fetchContractData()
    return () => {
      didCancel = true
    }
  }, [])

  return data.address ? (
    <div className='media'>
      <div className='media-content'>
        <p>
          Address: <small>{data.address}</small>
        </p>
        <p>
          Registration Fee:{' '}
          <strong>{ethers.utils.formatEther(data.registrationFee)} ETH</strong>
        </p>
        <p>
          <strong>{data.commitments}</strong> Members in the group
        </p>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )
}

export { ProofOfBurn }