package me.dillonbrock.cecs550.connectfourbackend;

import me.dillonbrock.cecs550.connectfourbackend.ai.Connect4Board;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

public class C4Utils {

    private static final Logger LOG = LoggerFactory.getLogger(C4Utils.class.getName());

    public static String loadResource(String filename) {
        String s = null;
        try {
            File file = ResourceUtils.getFile("classpath:" + filename);
            s = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
        } catch (Exception e) {
            LOG.error(e.getMessage());
        }
        return s;
    }
}
