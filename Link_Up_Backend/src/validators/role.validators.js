const { z } = require('zod');

const createRoleSchema = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title must be at most 100 characters'),

    description: z
        .string({ required_error: 'Description is required' })
        .min(20, 'Description must be at least 20 characters')
        .max(1000, 'Description must be at most 1000 characters'),

    requiredSkills: z
        .array(z.string())
        .min(1, 'At least one skill is required')
        .max(10, 'Maximum 10 skills allowed'),

    timeCommitment: z
        .string({ required_error: 'Time commitment is required' })
        .max(50, 'Time commitment must be at most 50 characters'),

    deadline: z
        .string({ required_error: 'Deadline is required' })
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
        .refine((date) => new Date(date) > new Date(), 'Deadline must be in the future'),
});

const updateRoleSchema = z.object({
    title: z.string().min(5).max(100).optional(),
    description: z.string().min(20).max(1000).optional(),
    requiredSkills: z.array(z.string()).min(1).max(10).optional(),
    timeCommitment: z.string().max(50).optional(),
    deadline: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
        .refine((date) => new Date(date) > new Date(), 'Deadline must be in the future')
        .optional(),
    status: z.enum(['OPEN', 'FILLED', 'EXPIRED']).optional(),
});

module.exports = { createRoleSchema, updateRoleSchema };