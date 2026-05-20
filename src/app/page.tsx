'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ProductionOrder } from '@/types'
import { OrderCard } from '@/components/order-card'
import { NewOrderForm } from '@/components/new-order-form'
import { OrderDetailModal } from '@/components/order-detail-modal'

export default function Home() {
  const [orders, setOrders] = useState<ProductionOrder[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('production_orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching orders:', error)
      return
    }

    setOrders(data || [])
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const handleOrderCreated = () => {
    setIsModalOpen(false)
    fetchOrders()
  }

  const handleOrderClick = (order: ProductionOrder) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  const handleOrderUpdate = async (updatedOrder: ProductionOrder) => {
    const { error } = await supabase
      .from('production_orders')
      .update(updatedOrder)
      .eq('id', updatedOrder.id)

    if (error) {
      console.error('Error updating order:', error)
      return
    }

    setIsDetailModalOpen(false)
    fetchOrders()
  }

  const handleOrderDelete = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return

    const { error } = await supabase
      .from('production_orders')
      .delete()
      .eq('id', orderId)

    if (error) {
      console.error('Error deleting order:', error)
      return
    }

    setIsDetailModalOpen(false)
    fetchOrders()
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-[#1A4D2E] mb-4">Production Orders</h2>
          <div className="flex gap-4 text-sm">
            {Object.entries(statusCounts).map(([status, count]) => (
              <span key={status} className="bg-white px-3 py-1 rounded border">
                {count} {status}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#B45309]"
        >
          New Order
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} onClick={() => handleOrderClick(order)} />
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <NewOrderForm
              onSuccess={handleOrderCreated}
              onCancel={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}

      {isDetailModalOpen && selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onUpdate={handleOrderUpdate}
          onDelete={handleOrderDelete}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </div>
  )
}
