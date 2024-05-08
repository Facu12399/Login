package com.example.login.service;

import com.example.login.model.FileData;
import com.example.login.repository.IFileDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class StorageService {

    @Autowired
    private IFileDataRepository fileDataRepository;

    private final String FOLDER_PATH="C:/Users/Usuario/AppData/Local/Temp/tomcat.8080.18152667982442575451/work/Tomcat/localhost/ROOT/Login/img/";

    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath=FOLDER_PATH+file.getOriginalFilename();

        FileData fileData=fileDataRepository.save(FileData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .filePath(filePath).build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "file uploaded successfully : " + filePath;
        }
        return null;
    }

    public byte[] downloadImageFromFileSystem(String fileName) throws IOException {
        Optional<FileData> fileData = fileDataRepository.findByName(fileName);
        String filePath=fileData.get().getFilePath();
        byte[] images = Files.readAllBytes(new File(filePath).toPath());
        return images;
    }

    public byte[] downloadImageFromFileSystemId(Long id) throws IOException {
        Optional<FileData> fileDataOptional = fileDataRepository.findById(id);
        if (fileDataOptional.isPresent()) {
            FileData fileData = fileDataOptional.get();
            String filePath = fileData.getFilePath();
            byte[] images = Files.readAllBytes(new File(filePath).toPath());
            return images;
        } else {
            // Manejar el caso en que el FileData con el ID dado no se encuentra
            throw new FileNotFoundException("No se encontró el archivo con el ID: " + id);
        }
    }

}
