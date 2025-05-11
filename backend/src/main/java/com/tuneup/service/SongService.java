package com.tuneup.service;

import com.tuneup.model.Song;
import com.tuneup.repository.SongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SongService {

    @Autowired
    private SongRepository songRepo;

    public List<Song> getAllSongs() {
        return songRepo.findAll();
    }

    public Optional<Song> getSongById(String id) {
        return songRepo.findById(id);
    }

    public Song saveSong(Song song) {
        return songRepo.save(song);
    }

    public void deleteSong(String id) {
        songRepo.deleteById(id);
    }
}
