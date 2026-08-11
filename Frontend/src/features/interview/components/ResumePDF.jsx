import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Define the styles for the PDF
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 11, color: "#333" },
  header: {
    marginBottom: 20,
    borderBottom: "1pt solid #ccc",
    paddingBottom: 10,
  },
  name: { fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 5 },
  contact: { fontSize: 10, color: "#555", marginBottom: 2 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginTop: 15,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  summary: { lineHeight: 1.5, marginBottom: 10 },
  itemContainer: { marginBottom: 12 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemTitle: { fontWeight: "bold", fontSize: 12 },
  itemDate: { fontSize: 10, fontStyle: "italic", color: "#666" },
  itemSub: { fontSize: 11, fontStyle: "italic", marginBottom: 4 },
  bullet: { flexDirection: "row", marginBottom: 3 },
  bulletPoint: { width: 10, fontSize: 10 },
  bulletText: { flex: 1, lineHeight: 1.4 },
  skills: { lineHeight: 1.5 },
});

const ResumePDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Info */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {data.personalInfo?.name || "Professional Candidate"}
        </Text>
        <Text style={styles.contact}>
          {data.personalInfo?.email} | {data.personalInfo?.phone}
        </Text>
        <Text style={styles.contact}>{data.personalInfo?.location}</Text>
      </View>

      {/* Summary */}
      <View>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      {/* Skills */}
      <View>
        <Text style={styles.sectionTitle}>Core Competencies</Text>
        <Text style={styles.skills}>{(data.skills || []).join(" • ")}</Text>
      </View>

      {/* Experience */}
      <View>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {(data.experience || []).map((job, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{job.role}</Text>
              <Text style={styles.itemDate}>{job.duration}</Text>
            </View>
            <Text style={styles.itemSub}>{job.company}</Text>
            {(job.highlights || []).map((highlight, i) => (
              <View key={i} style={styles.bullet}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>{highlight}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Education */}
      <View>
        <Text style={styles.sectionTitle}>Education</Text>
        {(data.education || []).map((edu, index) => (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle}>{edu.degree}</Text>
              <Text style={styles.itemDate}>{edu.year}</Text>
            </View>
            <Text style={styles.itemSub}>{edu.institution}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ResumePDF;
