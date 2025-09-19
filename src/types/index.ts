export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'hr' | 'employee' | 'manager'
  avatar?: string
  department?: string
  position?: string
  managerId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Employee {
  id: string
  userId: string
  employeeId: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: Date
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  workInfo: {
    jobTitle: string
    department: string
    managerId?: string
    joiningDate: Date
    employmentType: 'full-time' | 'part-time' | 'contract' | 'intern'
    status: 'active' | 'inactive' | 'terminated'
  }
  documents: Document[]
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  employeeId: string
  name: string
  type: 'certificate' | 'id' | 'contract' | 'resume' | 'other'
  url: string
  uploadedAt: Date
}

export interface LeaveRequest {
  id: string
  employeeId: string
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'paternity' | 'bereavement'
  startDate: Date
  endDate: Date
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  approvedBy?: string
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Attendance {
  id: string
  employeeId: string
  date: Date
  checkIn?: Date
  checkOut?: Date
  hoursWorked: number
  overtimeHours: number
  status: 'present' | 'absent' | 'late' | 'half-day'
  notes?: string
}

export interface PerformanceReview {
  id: string
  employeeId: string
  reviewerId: string
  period: string
  goals: Goal[]
  ratings: {
    overall: number
    communication: number
    teamwork: number
    problemSolving: number
    leadership: number
    technicalSkills: number
  }
  feedback: string
  recommendations: string
  status: 'draft' | 'submitted' | 'approved'
  createdAt: Date
  updatedAt: Date
}

export interface Goal {
  id: string
  title: string
  description: string
  targetDate: Date
  status: 'not-started' | 'in-progress' | 'completed' | 'cancelled'
  progress: number
}

export interface Payroll {
  id: string
  employeeId: string
  period: string
  basicSalary: number
  allowances: {
    housing: number
    transport: number
    medical: number
    other: number
  }
  deductions: {
    tax: number
    insurance: number
    retirement: number
    other: number
  }
  netSalary: number
  status: 'draft' | 'approved' | 'paid'
  createdAt: Date
  updatedAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  isRead: boolean
  createdAt: Date
}
