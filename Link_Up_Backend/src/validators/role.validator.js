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
        .string()
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
        .refine((date) => new Date(date) > new Date(), 'Deadline must be in the future')
        .optional(),

    eventDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
        .optional(),

    spotsTotal: z
        .number()
        .int()
        .min(1, 'Must have at least 1 spot')
        .max(100, 'Cannot exceed 100 spots')
        .optional()
        .default(1),

    imageUrl: z
        .string()
        .url('Must be a valid URL')
        .optional(),

    tags: z
        .array(z.string())
        .max(5, 'Maximum 5 tags')
        .optional()
        .default([]),
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

    eventDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), 'Invalid date format')
        .optional(),

    spotsTotal: z
        .number()
        .int()
        .min(1)
        .max(100)
        .optional(),

    imageUrl: z
        .string()
        .url('Must be a valid URL')
        .optional(),

    tags: z
        .array(z.string())
        .max(5, 'Maximum 5 tags')
        .optional(),
});

module.exports = { createRoleSchema, updateRoleSchema };