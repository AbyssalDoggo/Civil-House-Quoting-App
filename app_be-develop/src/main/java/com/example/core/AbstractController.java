package com.example.core;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import org.springframework.web.util.UriUtils;
import jakarta.servlet.http.HttpServletResponse;

public abstract class AbstractController {
  protected void setDownloadHeader(String fileName, HttpServletResponse response) {
    response.setContentType("application/octet-stream");
    response.setHeader("Content-Disposition",
        "attachment; filename*=UTF-8''" + UriUtils.encode(fileName, StandardCharsets.UTF_8));
  }

  protected void output(InputStream is, String fileName, HttpServletResponse response)
      throws IOException {
    try (BufferedInputStream bis = new BufferedInputStream(is);
        BufferedOutputStream bos = new BufferedOutputStream(response.getOutputStream())) {
      setDownloadHeader(fileName, response);
      byte[] data = new byte[1024];
      int len;
      while ((len = bis.read(data)) != -1) {
        bos.write(data, 0, len);
      }
      bos.flush();
    }
  }

  protected void output(String filePath, String fileName, HttpServletResponse response)
      throws IOException {
    try (InputStream is = new FileInputStream(filePath)) {
      output(is, fileName, response);
    }
  }

  protected void output(String filePath, HttpServletResponse response) throws IOException {
    File file = new File(filePath);
    output(filePath, file.getName(), response);
  }
}
