import type { Request, Response } from "express";
import logger from "../config/logger";
import { deleteUserById, getUserById, updateUserById } from "../services/auth.service";
import { userPatchSchema } from "../validators/user.validator";

export async function getUser(req: Request, res: Response) {
	try {
		const authUser = req.user;
		const user = await getUserById(authUser?.id as string);

		if (!user) {
			logger.info("user not found");
			res.status(400).json({
				success: false,
				error: "user not found",
			});
		}

		//@ts-ignore
		const { password, ...newUser } = user;

		res.status(200).json({
			success: true,
			message: "user data",
			data: {
				newUser,
			},
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			success: false,
			error: "something went wrong",
		});
	}
}

export async function updateUser(req: Request, res: Response) {
	try {
		const body = req.body;
		const user = req.user;
		const { success, error, data } = userPatchSchema.safeParse(body);
		if (!success) {
			logger.error(error);
			res.status(400).json({
				success: false,
				error: "invalid request body",
			});
		}

		const updatedPerson = await updateUserById(
			data?.age as number,
			data?.address as string,
			user?.id as string,
		);

		if (!updatedPerson) {
			logger.info("user not found");
			res.status(400).json({
				success: false,
				error: "user not found",
			});
		}

		//@ts-ignore
		const { password, ...responseUser } = updatedPerson;

		res.status(200).json({
			success: true,
			message: "user updated successfully",
			data: {
				responseUser,
			},
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			success: false,
			error: "something went wrong",
		});
	}
}


export async function deleteUser(req: Request, res: Response) {
  try {
    const user = req.user
    
    await deleteUserById(user?.id as string)
    
    res.status(204).json({
      success: true,
      message:"user account delete"
    })
  } catch (err) {
		logger.error(err);
		res.status(500).json({
			success: false,
			error: "something went wrong",
		});
	}
}