const { z } = require('zod');

const createRoleSchema = z.object({
    title: z
        .string({ required_error: 'Title is required' })
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title must be at most 100 characters'),

    category: z
        .string({ required_error: 'Category is required' })
        .min(2, 'Category must be at least 2 characters'),

    description: z
        .string({ required_error: 'Description is required' })
        .min(20, 'Description must be at least 20 characters')
        .max(1000, 'Description must be at most 1000 characters'),

    location: z
        .string()
        .optional(),

    isOnline: z
        .boolean()
        .optional()
        .default(true),

    deadline: z
        .string({ required_error: 'Deadline is required' })
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
        .refine((date) => new Date(date) > new Date(), 'Deadline must be in the future')
        .optional(),
});

const updateRoleSchema = z.object({
    title: z.string().min(5).max(100).optional(),
    category: z.string().min(2).optional(),
    description: z.string().min(20).max(1000).optional(),
    location: z.string().optional(),
    isOnline: z.boolean().optional(),
    deadline: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
        .refine((date) => new Date(date) > new Date(), 'Deadline must be in the future')
        .optional(),
});

module.exports = { createRoleSchema, updateRoleSchema };