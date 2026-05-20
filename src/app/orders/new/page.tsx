'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { OrderStatus, OrderPriority } from '@/types'

export default function NewOrderPage() {
  const [formData, setFormData] = useState({
    order_number: '',
    product_name: '',
    status: 'Pending' as OrderStatus,
    quantity_ordered: 0,
    quantity_completed: 0,
    production_line: '',
    priority: 'Standard' as OrderPriority,
    start_date: '',
    due_date: '',
    notes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('production_orders')
      .insert([formData])

    if (error) {
      alert('Error creating order: ' + error.message)
    } else {
      alert('Order created successfully!')
      // Reset form or redirect
      setFormData({
        order_number: '',
        product_name: '',
        status: 'Pending',
        quantity_ordered: 0,
        quantity_completed: 0,
        production_line: '',
        priority: 'Standard',
        start_date: '',
        due_date: '',
        notes: '',
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('quantity') ? parseInt(value) || 0 : value
    }))
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#1A4D2E] mb-6">Create New Production Order</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
            <input
              type="text"
              name="order_number"
              value={formData.order_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Running">Running</option>
              <option value="Down">Down</option>
              <option value="Complete">Complete</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Production Line</label>
            <input
              type="text"
              name="production_line"
              value={formData.production_line}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Ordered</label>
            <input
              type="number"
              name="quantity_ordered"
              value={formData.quantity_ordered}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Completed</label>
            <input
              type="number"
              name="quantity_completed"
              value={formData.quantity_completed}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="Standard">Standard</option>
              <option value="Rush">Rush</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#B45309]"
        >
          Create Order
        </button>
      </form>
    </div>
  )
}