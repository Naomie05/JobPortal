package com.apple.JobBoard.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import org.hibernate.annotations.GenericGenerator;

@Entity
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name = "data", length = 1000000)
    @Lob
    private byte[] data;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH
    }, targetEntity = JobSeeker.class)
    @JoinColumn(name = "seeker_id")
    @JsonIgnore
    private JobSeeker seeker;

    public Resume(){ }

    public Resume(String name, String type, byte[] data, JobSeeker seeker) {
        this.name = name;
        this.type = type;
        this.data = data;
        this.seeker = seeker;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public JobSeeker getSeeker() {
        return this.seeker;
    }

    public void setSeeker(JobSeeker seeker) {
        this.seeker = seeker;
    }
}
