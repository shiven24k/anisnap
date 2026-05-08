import { supabase } from "./supabaseClient";

const dataUrlToFile = async (dataUrl) => {
	const response = await fetch(dataUrl);
	const blob = await response.blob();
	return blob;
};

export const uploadDataUrl = async (bucket, path, dataUrl) => {
	const file = await dataUrlToFile(dataUrl);
	const { error } = await supabase.storage.from(bucket).upload(path, file, {
		cacheControl: "3600",
		contentType: file.type,
		upsert: true,
	});

	if (error) throw error;

	const { data } = supabase.storage.from(bucket).getPublicUrl(path);
	return data.publicUrl;
};

export const removeStorageFile = async (bucket, path) => {
	const { error } = await supabase.storage.from(bucket).remove([path]);
	if (error) throw error;
};
