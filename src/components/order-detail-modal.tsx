'use client'

import { useState } from 'react'
import { ProductionOrder } from '@/types'

interface OrderDetailModalProps {
  order: ProductionOrder
  onUpdate: (order: ProductionOrder) => void
  onDelete: (orderId: string) => void
  onClose: () => void
}

export function OrderDetailModal({ order, onUpdate, onDelete, onClose }: OrderDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOrder, setEditedOrder] = useState<ProductionOrder>(order)

  const handleSave = () => {
    onUpdate(editedOrder)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedOrder(order)
    setIsEditing(false)
  }

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Running: 'bg-green-100 text-green-800',
    Down: 'bg-red-100 text-red-800',
    Complete: 'bg-gray-100 text-gray-800',
  }

  const isOverdue = new Date(order.due_date) < new Date() && order.status !== 'Complete'
  const progressPercentage = order.quantity_ordered > 0 ? (order.quantity_completed / order.quantity_ordered) * 100 : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-[#1A4D2E]">
              {isEditing ? 'Edit Order' : 'Order Details'}
            </h2>
            <div className="flex gap-2">
              {!isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-[#D97706] text-white px-3 py-1 rounded text-sm hover:bg-[#B45309]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(order.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Order Number</label>
                <input
                  type="text"
                  value={editedOrder.order_number}
                  onChange={(e) => setEditedOrder({ ...editedOrder, order_number: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={editedOrder.product_name}
                  onChange={(e) => setEditedOrder({ ...editedOrder, product_name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={editedOrder.status}
                  onChange={(e) => setEditedOrder({ ...editedOrder, status: e.target.value as ProductionOrder['status'] })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="Running">Running</option>
                  <option value="Down">Down</option>
                  <option value="Complete">Complete</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity Ordered</label>
                  <input
                    type="number"
                    value={editedOrder.quantity_ordered}
                    onChange={(e) => setEditedOrder({ ...editedOrder, quantity_ordered: parseInt(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quantity Completed</label>
                  <input
                    type="number"
                    value={editedOrder.quantity_completed}
                    onChange={(e) => setEditedOrder({ ...editedOrder, quantity_completed: parseInt(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Production Line</label>
                <input
                  type="text"
                  value={editedOrder.production_line}
                  onChange={(e) => setEditedOrder({ ...editedOrder, production_line: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={editedOrder.priority}
                  onChange={(e) => setEditedOrder({ ...editedOrder, priority: e.target.value as ProductionOrder['priority'] })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Standard">Standard</option>
                  <option value="Rush">Rush</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    value={editedOrder.start_date}
                    onChange={(e) => setEditedOrder({ ...editedOrder, start_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Due Date</label>
                  <input
                    type="date"
                    value={editedOrder.due_date}
                    onChange={(e) => setEditedOrder({ ...editedOrder, due_date: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={editedOrder.notes || ''}
                  onChange={(e) => setEditedOrder({ ...editedOrder, notes: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#B45309]"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{order.order_number}</h3>
                  <p className="text-gray-700">{order.product_name}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Production Line:</span> {order.production_line}
                </div>
                <div>
                  <span className="font-medium">Priority:</span> {order.priority}
                </div>
                <div>
                  <span className="font-medium">Start Date:</span> {new Date(order.start_date).toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Due Date:</span> {new Date(order.due_date).toLocaleDateString()}
                  {isOverdue && <span className="text-red-600 font-medium ml-2">Overdue</span>}
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress: {order.quantity_completed}/{order.quantity_ordered}</span>
                  <span>{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#D97706] h-2 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              {order.notes && (
                <div>
                  <span className="font-medium text-sm">Notes:</span>
                  <p className="text-gray-600 mt-1">{order.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}