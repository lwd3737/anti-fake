import { z } from "zod";

export const verificationEvidenceSchema = z.object({
	items: z.array(
		z.object({
			summary: z.string(),
			citationIndexes: z.array(z.number()),
		}),
	),
	citations: z.array(
		z.object({
			siteName: z.string(),
			url: z.string().url(),
			title: z.string(),
			description: z.string().optional(),
			imageUrl: z.string().url().optional(),
		}),
	),
});

export type VerificationEvidence = z.infer<typeof verificationEvidenceSchema>;
