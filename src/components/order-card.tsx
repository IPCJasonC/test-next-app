import { ProductionOrder } from '@/types'

interface OrderCardProps {
  order: ProductionOrder
  onClick?: () => void
}

export function OrderCard({ order, onClick }: OrderCardProps) {
  const isOverdue = new Date(order.due_date) < new Date() && order.status !== 'Complete'

  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Running: 'bg-green-100 text-green-800',
    Down: 'bg-red-100 text-red-800',
    Complete: 'bg-gray-100 text-gray-800',
  }

  const progressPercentage = order.quantity_ordered > 0 ? (order.quantity_completed / order.quantity_ordered) * 100 : 0

  return (
    <div className={`bg-white border border-gray-300 rounded-lg p-4 shadow-sm cursor-pointer ${isOverdue ? 'border-red-500' : ''}`} onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg">{order.order_number}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-700 mb-2">{order.product_name}</p>
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Line: {order.production_line}</span>
        <span>Priority: {order.priority}</span>
      </div>
      <div className="mb-2">
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
      <div className="flex justify-between text-sm text-gray-600">
        <span>Due: {new Date(order.due_date).toLocaleDateString()}</span>
        {isOverdue && <span className="text-red-600 font-medium">Overdue</span>}
      </div>
      {order.notes && <p className="text-sm text-gray-500 mt-2">{order.notes}</p>}
    </div>
  )
}